# Task Manager Application

A full-stack task management application built with Express.js (backend), React + Vite (frontend), and JSON file storage.

## Project Structure

```
task-manager/
├── backend/              # Express.js REST API
├── frontend/             # React + Vite UI
├── database/             # JSON file storage
├── postman_collection.json
└── README.md
```

## Quick Start

**Terminal 1 — Backend:**
```bash
cd task-manager/backend
npm install
npm run dev
# Backend runs on http://localhost:4000
```

**Terminal 2 — Frontend:**
```bash
cd task-manager/frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

### ✨ Create Tasks
- Add task title (required)
- Set description, priority level
- Add due date and tags
- All fields except title are optional

### ✏️ Edit Tasks
- Click "Edit" on any task card to modify
- Change any field and update

### ✅ Mark Complete
- Check the checkbox to toggle completion status
- Completed tasks appear faded with strikethrough title

### 🗑️ Delete Tasks
- Click "Delete" to remove a task
- Confirmation prompt prevents accidental deletion

### 📊 Progress Tracking
- View completion count at the top of the task list
- e.g., "2 of 5 completed"

## Technology Stack

- **Backend:** Node.js, Express.js, UUID
- **Frontend:** React 18, Vite, CSS3
- **Database:** JSON files (no server required)
- **Testing:** Jest + Supertest (backend)
- **API:** RESTful endpoints with CORS enabled

## API Documentation

See [postman_collection.json](./postman_collection.json) for request examples.

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Task Model

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "createdAt": "ISO timestamp",
  "dueDate": "ISO timestamp | null",
  "tags": ["string"],
  "priority": "low | medium | high"
}
```

## Testing

Backend includes Jest + Supertest tests:

```bash
cd task-manager/backend
npm test
```

## Development

For detailed setup and run instructions, see:
- [backend/README.md](./backend/README.md)
- [frontend/README.md](./frontend/README.md)
