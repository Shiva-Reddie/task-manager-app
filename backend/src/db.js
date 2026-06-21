const fs = require('fs').promises;
const path = require('path');

const DB_PATH = process.env.TASKS_DB_PATH || path.resolve(__dirname, '..', '..', 'database', 'tasks.json');

async function readTasks() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    const data = JSON.parse(raw || '[]');
    if (!Array.isArray(data)) return [];
    return data;
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeTasks(tasks) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = { readTasks, writeTasks };
