import request from 'supertest';
import app from '../server';

describe('Log Endpoints', () => {
  let createdLogId: number;
  it('should fetch all logs', async () => {
    const res = await request(app).get('/api/logs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new log', async () => {
    const newLog = {
      userName: 'Alice',
      userQuery: 'Hello?',
      botResponse: 'Hi Alice!',
    };
    const res = await request(app).post('/api/logs').send(newLog);
    expect(res.statusCode).toBe(201);
    expect(res.body.userName).toBe(newLog.userName);
    expect(res.body.userQuery).toBe(newLog.userQuery);
    expect(res.body.botResponse).toBe(newLog.botResponse);

    // Storing the created ID for subsequent tests
    createdLogId = res.body.id;
  });

  it('should retrieve a single log by ID', async () => {
    const res = await request(app).get(`/api/logs/${createdLogId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdLogId);
    expect(res.body.userName).toBeDefined();
    expect(res.body.userQuery).toBeDefined();
    expect(res.body.botResponse).toBeDefined();
  });

  it('should update an existing log', async () => {
    const updatedData = {
      userName: 'Alice Bob',
      userQuery: 'Hi again?',
      botResponse: 'Hello, Alice Bob!',
    };

    const res = await request(app)
      .put(`/api/logs/${createdLogId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdLogId);
    expect(res.body.userName).toBe(updatedData.userName);
    expect(res.body.userQuery).toBe(updatedData.userQuery);
  });

  it('should delete an existing log', async () => {
    const res = await request(app).delete(`/api/logs/${createdLogId}`);
    expect(res.statusCode).toBe(204);

    // To verify it's now deleted
    const getRes = await request(app).get(`/api/logs/${createdLogId}`);
    expect(getRes.statusCode).toBe(404);
  });
});
