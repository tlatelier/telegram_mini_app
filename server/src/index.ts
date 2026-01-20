import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { initializeSchema, pool } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).send('ok');
});

const interestSchema = z.object({
    tripId: z.string().min(1),
    destination: z.string().optional(),
    telegramUserId: z.number().int().optional(),
    telegramUsername: z.string().optional(),
    source: z.string().optional(),
    createdAt: z.string().optional(),
});

app.post('/telegram/interests', async (req, res) => {
    const parsed = interestSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: 'Invalid payload',
            details: parsed.error.flatten(),
        });
    }

    const {
        tripId,
        destination,
        telegramUserId,
        telegramUsername,
        source,
    } = parsed.data;

    try {
        const result = await pool.query(
            `
            INSERT INTO interests (trip_id, destination, telegram_user_id, telegram_username, source)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (trip_id, telegram_user_id)
            DO UPDATE SET
                destination = COALESCE(EXCLUDED.destination, interests.destination),
                telegram_username = COALESCE(EXCLUDED.telegram_username, interests.telegram_username),
                source = COALESCE(EXCLUDED.source, interests.source),
                updated_at = NOW()
            RETURNING *;
            `,
            [tripId, destination ?? null, telegramUserId ?? null, telegramUsername ?? null, source ?? null],
        );

        return res.status(200).json({
            ok: true,
            interest: result.rows[0],
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('DB error', error);
        return res.status(500).json({ ok: false });
    }
});

const PORT = Number(process.env.PORT ?? 4000);

initializeSchema()
    .then(() => {
        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Failed to initialize schema', error);
        process.exit(1);
    });


