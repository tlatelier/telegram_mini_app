import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const outFile = path.join(distDir, 'version.json');

if (!fs.existsSync(distDir)) {
    console.error('[write-version] dist/ not found, run build first.');
    process.exit(1);
}

// Стабильная версия в рамках одного запуска (секунды достаточно).
const version = process.env.BUILD_VERSION ?? new Date().toISOString();

fs.writeFileSync(outFile, JSON.stringify({ version }, null, 2), 'utf8');
console.log('[write-version] wrote', outFile, 'version=', version);

