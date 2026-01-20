import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    // eslint-disable-next-line no-console
    console.warn('DATABASE_URL is not set. Postgres connection will fail until it is provided.');
}

const pool = new Pool({
    connectionString: databaseUrl,
});

const initializeSchema = async (): Promise<void> => {
    const client = await pool.connect();

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS interests (
                id BIGSERIAL PRIMARY KEY,
                trip_id TEXT NOT NULL,
                destination TEXT,
                telegram_user_id BIGINT,
                telegram_username TEXT,
                source TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        await client.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS interests_trip_tg_unique
            ON interests (trip_id, telegram_user_id);
        `);
    } finally {
        client.release();
    }
};

export {
    pool,
    initializeSchema,
};


