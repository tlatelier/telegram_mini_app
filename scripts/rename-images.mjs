#!/usr/bin/env node
/**
 * Переименование изображений в указанной директории в формат: <prefix>-<index>.webp
 * Использование:
 *   node ./scripts/rename-images.mjs <DIR> <PREFIX> [--start=1]
 *
 * Пример:
 *   node ./scripts/rename-images.mjs ./public/images/gallery/altai sun --start=1
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node ./scripts/rename-images.mjs <DIR> <PREFIX> [--start=1]');
  process.exit(1);
}

const [targetDirRaw, prefixRaw, ...rest] = args;
const targetDir = path.resolve(process.cwd(), targetDirRaw);
const prefix = String(prefixRaw);
const startArg = rest.find(a => a.startsWith('--start='));
const startIndex = startArg ? Number(startArg.split('=')[1]) : 1;

const ALLOWED_EXTS = new Set(['.webp']);

function pad(num) {
  return String(num);
}

async function main() {
  try {
    await fs.access(targetDir);
  } catch {
    console.error(`Директория не найдена: ${targetDir}`);
    process.exit(1);
  }

  const entries = await fs.readdir(targetDir, { withFileTypes: true });
  // Фильтруем только файлы .webp
  const files = entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(name => ALLOWED_EXTS.has(path.extname(name).toLowerCase()));

  if (files.length === 0) {
    console.log('Нет файлов .webp для переименования.');
    return;
  }

  // Сортируем по имени, чтобы порядок был детерминированным
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  let index = startIndex;
  for (const name of files) {
    const oldPath = path.join(targetDir, name);
    const newName = `${prefix}-${pad(index)}.webp`;
    const newPath = path.join(targetDir, newName);

    // Если файл с именем уже существует — увеличиваем индекс, чтобы избежать коллизий
    try {
      await fs.access(newPath);
      // существует — ищем следующий свободный индекс
      let probe = index + 1;
      let candidate = path.join(targetDir, `${prefix}-${pad(probe)}.webp`);
      while (true) {
        try {
          await fs.access(candidate);
          probe += 1;
          candidate = path.join(targetDir, `${prefix}-${pad(probe)}.webp`);
        } catch {
          // свободно
          index = probe;
          break;
        }
      }
    } catch {
      // не существует — всё ок
    }

    await fs.rename(oldPath, newPath);
    console.log(`${name} -> ${newName}`);
    index += 1;
  }

  console.log('Готово.');
}

main().catch((e) => {
  console.error('Ошибка:', e);
  process.exit(1);
});


