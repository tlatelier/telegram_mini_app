/**
 * Предзагружает изображения для быстрого отображения в фоне
 * Использует батчи и requestIdleCallback для неблокирующей загрузки
 */
const BATCH_SIZE = 3; // Загружаем по 3 изображения одновременно
const IDLE_DELAY = 100; // Задержка между батчами в мс

const loadImageInBackground = (url: string): Promise<void> => {
    return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Не блокируем, если одно изображение не загрузилось
        img.src = url;
    });
};

const processBatch = (batch: string[]): Promise<void[]> => {
    return Promise.all(batch.map(loadImageInBackground));
};

/**
 * Предзагружает изображения батчами в фоне, не блокируя UI
 */
export const preloadImages = (urls: string[]): Promise<void> => {
    const filtered = urls.filter((url) => url && url.trim());
    
    if (filtered.length === 0) {
        return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
        // Разбиваем на батчи
        const batches: string[][] = [];
        for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
            batches.push(filtered.slice(i, i + BATCH_SIZE));
        }

        let currentBatch = 0;

        const loadNextBatch = () => {
            if (currentBatch >= batches.length) {
                resolve();
                return;
            }

            const batch = batches[currentBatch];
            currentBatch++;

            // Загружаем текущий батч
            processBatch(batch).then(() => {
                // Используем requestIdleCallback для следующего батча, если доступен
                // Иначе используем setTimeout с небольшой задержкой
                if (typeof requestIdleCallback !== 'undefined') {
                    requestIdleCallback(
                        () => {
                            loadNextBatch();
                        },
                        { timeout: 1000 },
                    );
                } else {
                    setTimeout(() => {
                        loadNextBatch();
                    }, IDLE_DELAY);
                }
            });
        };

        // Начинаем загрузку первого батча сразу
        // Остальные будут загружаться в фоне
        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(
                () => {
                    loadNextBatch();
                },
                { timeout: 500 },
            );
        } else {
            // Fallback для браузеров без requestIdleCallback
            setTimeout(() => {
                loadNextBatch();
            }, 50);
        }
    });
};
