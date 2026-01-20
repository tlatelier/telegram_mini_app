# Telegram Mini App Backend (Postgres)

Бекенд на Node.js/Express с Postgres для записи интересов пользователей к поездкам.

## Быстрый старт

1) Поднимите Postgres (вариант через Docker):
```
docker compose up -d db
```

2) Создайте файл `server/.env` со значениями:
```
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/miniapp
```

3) Установите зависимости и запустите сервер:
```
cd server
npm i
npm run dev
```

4) Настройте фронтенд (в корне фронта `.env`):
```
VITE_INTERESTS_API_URL=http://localhost:4000/telegram/interests
```

## API

- `POST /telegram/interests`
  - Тело:
  ```json
  {
    "tripId": "string",
    "destination": "string? ",
    "telegramUserId": 1234567,
    "telegramUsername": "nick",
    "source": "TELEGRAM"
  }
  ```
  - Ответ: `{ "ok": true, "interest": { ... } }`

Дедупликация: upsert по `(trip_id, telegram_user_id)` с обновлением `updated_at`.


