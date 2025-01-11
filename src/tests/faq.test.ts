import request from 'supertest';
import app from '../server';

describe('FAQ Endpoints', () => {
  let createdFAQId: number;
  it('should fetch all FAQs', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new FAQ', async () => {
    const newFAQ = {
      question: 'What exactly do you do?',
      answer: 'business management',
    };
    const res = await request(app).post('/api/faqs').send(newFAQ);
    expect(res.statusCode).toBe(201);
    expect(res.body.question).toBe(newFAQ.question);
    expect(res.body.answer).toBe(newFAQ.answer);

    // Storing the created ID for subsequent tests
    createdFAQId = res.body.id;
  });

  it('should retrieve a single FAQ by ID', async () => {
    const res = await request(app).get(`/api/faqs/${createdFAQId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdFAQId);
    expect(res.body.question).toBeDefined();
    expect(res.body.answer).toBeDefined();
  });

  it('should update an existing FAQ', async () => {
    const updatedData = {
      question: 'Do you provide technical support?',
      answer: 'Yes, we offer limited support on weekends as well.',
    };

    const res = await request(app)
      .put(`/api/faqs/${createdFAQId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdFAQId);
    expect(res.body.answer).toBe(updatedData.answer);
  });

  it('should delete an existing FAQ', async () => {
    const res = await request(app).delete(`/api/faqs/${createdFAQId}`);
    expect(res.statusCode).toBe(204);

    // To verify it's now deleted
    const getRes = await request(app).get(`/api/faqs/${createdFAQId}`);
    expect(getRes.statusCode).toBe(404); // or whatever your route returns
  });
});
