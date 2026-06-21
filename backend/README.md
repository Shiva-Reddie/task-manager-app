# Backend (Express.js)

Node.js/Express backend with a file-based JSON database for the Task Manager application.

## Setup

```bash
cd task-manager/backend
npm install
```

## Development

```bash
npm run dev
```

Server runs at `http://localhost:4000`

Uses `nodemon` for automatic restart on file changes.

## Production

```bash
npm start
```

## API Endpoints

- `GET /api/tasks` — Get all tasks
- `GET /api/tasks/:id` — Get a single task
- `POST /api/tasks` — Create a new task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task
- `GET /health` — Health check

## Database

Tasks are stored in `../database/tasks.json` as a JSON file.

Each task object has:
- `id`: UUID (generated server-side)
- `title`: string (required)
- `description`: string
- `completed`: boolean
- `createdAt`: ISO timestamp
- `dueDate`: ISO timestamp or null
- `tags`: string[]
- `priority`: 'low' | 'medium' | 'high'

## Testing

Run automated tests:

```bash
npm test
```

Uses Jest and Supertest; tests use a temporary DB file.
