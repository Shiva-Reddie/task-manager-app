# Frontend (Vite + React)

Modern React frontend for the Task Manager application using Vite for fast development.

## Setup

```bash
cd task-manager/frontend
npm install
```

## Development

```bash
npm run dev
```

Server runs at `http://localhost:5173`

Requests to `/api/*` are proxied to `http://localhost:4000` (backend).

## Build for Production

```bash
npm run build
npm run preview
```

## Features

- ✨ Add new tasks with title, description, priority, due date, and tags
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as complete
- 📊 Track completion progress
- 🎨 Clean, responsive UI

## Notes

- Make sure the backend is running on `http://localhost:4000`
- The UI will automatically fetch tasks from the backend on page load
