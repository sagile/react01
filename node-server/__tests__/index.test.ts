import request from 'supertest';
import express, { Express } from 'express';
import app from '../src/index'; // Ensure your Express app is exported from `index.ts`

describe('API Endpoints', () => {
  let testApp: Express;

  beforeAll(() => {
    testApp = express();
    testApp.use('/', app);
  });

  test('GET /api/hello should return a greeting message', async () => {
    const res = await request(testApp).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Hello from Node.js server!");
  });

  test('GET /api/texts should return an empty array initially', async () => {
    const res = await request(testApp).get('/api/texts');
    expect(res.status).toBe(200);
    expect(res.body.texts).toEqual([]);
  });

  test('POST /api/texts should save a new text', async () => {
    const newText = "Test text";
    const res = await request(testApp)
      .post('/api/texts')
      .send({ text: newText });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Text saved successfully');

    // Verify text is now saved
    const getRes = await request(testApp).get('/api/texts');
    expect(getRes.body.texts).toContain(newText);
  });

  test('DELETE /api/texts/:index should delete a text by index', async () => {
    const textToDelete = "Delete me";

    // Add text to delete
    await request(testApp).post('/api/texts').send({ text: textToDelete });
    let getRes = await request(testApp).get('/api/texts');
    const initialLength = getRes.body.texts.length;

    // Delete the last item (index = initialLength - 1)
    const deleteRes = await request(testApp).delete(`/api/texts/${initialLength - 1}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe('Text deleted successfully');

    // Verify deletion
    getRes = await request(testApp).get('/api/texts');
    expect(getRes.body.texts.length).toBe(initialLength - 1);
    expect(getRes.body.texts).not.toContain(textToDelete);
  });

  test('DELETE /api/texts/:index should return 404 for an invalid index', async () => {
    const res = await request(testApp).delete('/api/texts/999');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Text not found');
  });
});
