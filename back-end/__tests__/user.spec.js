const request = require('supertest');
// const app = '127.0.0.1:4000/api/v1/';
// const apiRouter = '../server/routes';
// const express = require('express');
// const app = express();
// app.use('/api');
const api = require('../app');

describe('Get Endpoints', () => {
  it('test from /api', async () => {
    const res = await request(api).get('/api/v1/users/');
    // console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Silahkan login terlebih dahulu');
  });
});
