/**
 * Преобразует путь к файлу из public так, чтобы он работал под Vite `base`.
 *
 * Пример:
 * - base = "/telegram_mini_app/"
 * - "/images/a.webp" -> "/telegram_mini_app/images/a.webp"
 * - "images/a.webp"  -> "/telegram_mini_app/images/a.webp"
 */
export function withBase(url: string): string {
    const raw = (url ?? '').trim();

    if (!raw) {
        return raw;
    }

    // Уже абсолютный URL или специальные схемы — не трогаем.
    if (
        raw.startsWith('http://') ||
        raw.startsWith('https://') ||
        raw.startsWith('data:') ||
        raw.startsWith('blob:')
    ) {
        return raw;
    }

    const base = (import.meta as any)?.env?.BASE_URL ?? '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;

    // Если уже содержит base (например, после ручной правки) — не дублируем.
    if (raw.startsWith(normalizedBase)) {
        return raw;
    }

    const normalizedUrl = raw.startsWith('/') ? raw.slice(1) : raw;
    return `${normalizedBase}${normalizedUrl}`;
}

