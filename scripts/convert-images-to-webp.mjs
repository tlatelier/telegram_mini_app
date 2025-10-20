#!/usr/bin/env node
/**
 * Сжатие изображений в public/images: конвертация в WebP и рекомпрессия .webp.
 *
 * Поддержка входных форматов: .heic, .heif, .jpeg, .jpg, .png, .webp
 * Для не-webp создаёт соседний .webp; исходник не удаляется.
 * Для .webp выполняет рекомпрессию В МЕСТЕ (без двойного расширения) с безопасной заменой,
 * если результирующий файл меньше исходного. Можно включить resize.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Ленивая загрузка sharp, чтобы не падать если не установлен
let sharp;
async function getSharp() {
    if (!sharp) {
        try {
            sharp = (await import("sharp")).default;
        } catch (e) {
            console.error('\n[convert-images-to-webp] Требуется зависимость "sharp". Установите:');
            console.error("npm i -D sharp");
            process.exit(1);
        }
    }
    return sharp;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.resolve(ROOT, "public", "images");

const INPUT_EXTS = new Set([".heic", ".heif", ".jpeg", ".jpg", ".png", ".webp"]);

// Настройки качества/ресайза WebP
const QUALITY = Number(process.env.WEBP_QUALITY ?? 80);
const LOSSLESS = String(process.env.WEBP_LOSSLESS ?? "false") === "true";
const EFFORT = Number(process.env.EFFORT ?? 6); // 0..6
const MAX_WIDTH = Number(process.env.MAX_WIDTH ?? 0); // 0 = без ограничения
const MAX_HEIGHT = Number(process.env.MAX_HEIGHT ?? 0); // 0 = без ограничения

function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return `${bytes}`;
    const units = ["B", "KB", "MB", "GB"];
    let i = 0;
    let n = Math.max(bytes, 0);
    while (n >= 1024 && i < units.length - 1) {
        n /= 1024;
        i++;
    }
    return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

async function* walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            yield* walk(fullPath);
        } else if (entry.isFile()) {
            yield fullPath;
        }
    }
}

function withResize(pipeline) {
    const width = Number.isFinite(MAX_WIDTH) && MAX_WIDTH > 0 ? MAX_WIDTH : null;
    const height = Number.isFinite(MAX_HEIGHT) && MAX_HEIGHT > 0 ? MAX_HEIGHT : null;
    if (width || height) {
        return pipeline.resize(width ?? null, height ?? null, {
            fit: "inside",
            withoutEnlargement: true,
        });
    }
    return pipeline;
}

async function recompressWebp(inputPath) {
    const tmpPath = `${inputPath}.tmp`;
    const s = await getSharp();

    try {
        const srcStat = await fs.stat(inputPath);
        let image = s(inputPath);
        image = withResize(image);

        await image.webp({ quality: QUALITY, effort: EFFORT, lossless: LOSSLESS }).toFile(tmpPath);

        const outStat = await fs.stat(tmpPath);
        if (outStat.size < srcStat.size) {
            // Заменяем оригинал только если реально стало меньше
            await fs.rename(tmpPath, inputPath);
            return { recompressed: true, savedBytes: srcStat.size - outStat.size };
        } else {
            await fs.rm(tmpPath).catch(() => {});
            return { skipped: true };
        }
    } catch (e) {
        await fs.rm(tmpPath).catch(() => {});
        console.error(`[convert-images-to-webp] Ошибка для ${inputPath}:`, e.message);
        return { error: true };
    }
}

async function convertToWebp(inputPath, ext) {
    const base = inputPath.slice(0, -ext.length);
    const outputPath = base + ".webp";

    // Пропускаем если webp уже существует и свежее исходника
    try {
        const [srcStat, outStat] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);
        if (outStat.mtimeMs >= srcStat.mtimeMs) {
            return { skipped: true };
        }
    } catch {}

    const s = await getSharp();
    try {
        let image = s(inputPath);
        image = withResize(image);
        await image.webp({ quality: QUALITY, effort: EFFORT, lossless: LOSSLESS }).toFile(outputPath);

        // Статистика экономии (относительно исходника)
        try {
            const [srcStat, outStat] = await Promise.all([fs.stat(inputPath), fs.stat(outputPath)]);
            return { outputPath, savedBytes: Math.max(0, srcStat.size - outStat.size) };
        } catch {
            return { outputPath };
        }
    } catch (e) {
        console.error(`[convert-images-to-webp] Ошибка для ${inputPath}:`, e.message);
        return { error: true };
    }
}

async function processFile(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    if (!INPUT_EXTS.has(ext)) return { skipped: true };
    if (ext === ".webp") {
        return recompressWebp(inputPath);
    }
    return convertToWebp(inputPath, ext);
}

async function main() {
    try {
        // Проверяем наличие директории
        await fs.access(IMAGES_DIR);
    } catch {
        console.error(`[convert-images-to-webp] Не найдена директория: ${IMAGES_DIR}`);
        process.exit(1);
    }

    const tasks = [];
    for await (const file of walk(IMAGES_DIR)) {
        tasks.push(processFile(file));
    }

    const results = await Promise.all(tasks);
    const converted = results.filter((r) => r && (r.outputPath || r.recompressed)).length;
    const skipped = results.filter((r) => r && r.skipped).length;
    const errors = results.filter((r) => r && r.error).length;
    const totalSaved = results.reduce((sum, r) => sum + (r?.savedBytes ?? 0), 0);

    console.log(
        `[convert-images-to-webp] Готово. Обработано: ${converted}, пропущено: ${skipped}, ошибок: ${errors}. Сэкономлено: ${formatBytes(totalSaved)}.\n` +
            `Параметры: QUALITY=${QUALITY}, LOSSLESS=${LOSSLESS}, EFFORT=${EFFORT}, MAX_WIDTH=${MAX_WIDTH || "-"}, MAX_HEIGHT=${MAX_HEIGHT || "-"}`,
    );
}

main().catch((e) => {
    console.error("[convert-images-to-webp] Неожиданная ошибка:", e);
    process.exit(1);
});
