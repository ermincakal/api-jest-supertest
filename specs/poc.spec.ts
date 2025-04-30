import * as supertest from 'supertest';

const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {
  describe('GET requests', () => {
    it('GET /posts', async () => {
      const res = await request.get('/posts');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].id).toBe(1);
    });

    it('GET /cooments with query', async () => {
      //const res = await request.get('/comments?postId=1');
      const res = await request
        .get('/comments')
        .query({ postId: 1, limit: 10 });

      expect(res.body[0].postId).toBe(1);
    });
  });

  describe('POST request', () => {
    it('POST /post', async () => {
      const data = {
        title: 'My favorite animes',
        body: 'Naruto, One piece, Death Note',
        userId: 1,
      };
      const res = await request.post('/posts').send(data);

      expect(res.body.title).toBe(data.title);
    });
  });

  describe('PUT request', () => {
    it('PUT /posts/{id}', async () => {
      const data = {
        title: 'Updated title',
        body: 'Updated body...',
        userId: 5,
      };

      const getRes = await request.get('/posts/1');
      const beforeTitle = getRes.body.title;
      //console.log(beforeTitle);

      const res = await request.put('/posts/1').send(data);

      expect(res.body.title).toBe(data.title);
      expect(res.body.title).not.toBe(beforeTitle);

      // GET call and verify the tittle is expected
    });
  });

  describe('PATCH request', () => {
    it('PATCH /posts/{id}', async () => {
      const data = {
        title: 'My new title',
      };

      const getRes = await request.get('/posts/1');
      const beforeTitle = getRes.body.title;

      const res = await request.patch('/posts/1').send(data);
      expect(res.body.title).toBe(data.title);
      expect(res.body.title).not.toBe(beforeTitle);
    });
  });

  describe('DELETE request', () => {
    it('DELETE /posts/{id}', async () => {
      const res = await request.delete('/posts/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({});
    });
  });
});
