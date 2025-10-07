#!/usr/bin/env node
/**
 * Конвертация изображений в public/images в WebP с сжатием.
 * Поддерживаемые входные форматы: heic, heif, jpeg, jpg, png.
 * Результат: .webp файлы рядом с исходниками. Исходники не удаляются.
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

const INPUT_EXTS = new Set([".heic", ".heif", ".jpeg", ".jpg", ".png"]);

// Настройки качества WebP
const QUALITY = Number(process.env.WEBP_QUALITY ?? 80);
const LOSSLESS = String(process.env.WEBP_LOSSLESS ?? "false") === "true";

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

async function convertFile(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    if (!INPUT_EXTS.has(ext)) return { skipped: true };

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
        const image = s(inputPath);
        await image.webp({ quality: QUALITY, effort: 6, lossless: LOSSLESS }).toFile(outputPath);
        return { outputPath };
    } catch (e) {
        console.error(`[convert-images-to-webp] Ошибка для ${inputPath}:`, e.message);
        return { error: true };
    }
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
        tasks.push(convertFile(file));
    }

    const results = await Promise.all(tasks);
    const converted = results.filter((r) => r && r.outputPath).length;
    const skipped = results.filter((r) => r && r.skipped).length;
    const errors = results.filter((r) => r && r.error).length;

    console.log(
        `[convert-images-to-webp] Готово. Преобразовано: ${converted}, пропущено: ${skipped}, ошибок: ${errors}.`,
    );
}

main().catch((e) => {
    console.error("[convert-images-to-webp] Неожиданная ошибка:", e);
    process.exit(1);
});
