const fs = require('fs').promises;
const path = require('path');
const request = require('supertest');

// Set a temporary DB file before loading the app
const tmpDb = path.resolve(__dirname, 'tmp.tasks.json');
process.env.TASKS_DB_PATH = tmpDb;

const app = require('../src/index');

beforeAll(async () => {
  // ensure empty DB
  await fs.writeFile(tmpDb, '[]', 'utf8');
});

afterAll(async () => {
  try { await fs.unlink(tmpDb); } catch (e) { }
});

describe('Tasks API (file-backed)', () => {
  let created;

  test('GET /api/tasks initially empty', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/tasks create', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test create', description: 'desc' })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Test create');
    created = res.body;
  });

  test('GET /api/tasks/:id returns created', async () => {
    const res = await request(app).get(`/api/tasks/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(created.id);
  });

  test('PUT /api/tasks/:id update', async () => {
    const res = await request(app)
      .put(`/api/tasks/${created.id}`)
      .send({ completed: true })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('DELETE /api/tasks/:id removes', async () => {
    const res = await request(app).delete(`/api/tasks/${created.id}`);
    expect(res.statusCode).toBe(200);
    const list = await request(app).get('/api/tasks');
    expect(list.body.find(x => x.id === created.id)).toBeUndefined();
  });
});
