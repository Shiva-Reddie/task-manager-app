const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readTasks, writeTasks } = require('../db');

const router = express.Router();

function validateTaskPayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Invalid payload';
  if (!payload.title || typeof payload.title !== 'string') return 'Missing or invalid `title`';
  return null;
}

router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const t = tasks.find(x => x.id === req.params.id);
    if (!t) return res.status(404).json({ error: 'Task not found' });
    res.json(t);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const errMsg = validateTaskPayload(req.body);
    if (errMsg) return res.status(400).json({ error: errMsg });

    const tasks = await readTasks();
    const now = new Date().toISOString();
    const task = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description || '',
      completed: !!req.body.completed,
      createdAt: now,
      dueDate: req.body.dueDate || null,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      priority: req.body.priority || 'medium'
    };
    tasks.push(task);
    await writeTasks(tasks);
    res.status(201).json(task);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const idx = tasks.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });

    const existing = tasks[idx];
    const updates = req.body || {};
    const updated = {
      ...existing,
      title: typeof updates.title === 'string' ? updates.title : existing.title,
      description: typeof updates.description === 'string' ? updates.description : existing.description,
      completed: typeof updates.completed === 'boolean' ? updates.completed : existing.completed,
      dueDate: 'dueDate' in updates ? updates.dueDate : existing.dueDate,
      tags: Array.isArray(updates.tags) ? updates.tags : existing.tags,
      priority: updates.priority || existing.priority
    };

    tasks[idx] = updated;
    await writeTasks(tasks);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const idx = tasks.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });
    const [removed] = tasks.splice(idx, 1);
    await writeTasks(tasks);
    res.json(removed);
  } catch (err) { next(err); }
});

module.exports = router;
