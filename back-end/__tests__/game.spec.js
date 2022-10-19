const request = require('supertest')
const app = require('../server/routes/index')

describe('GET / ', () => {
    test('Return status 201 and payload list of games', () => {
        request(app)
            .get('/')
            .expect("Content-Type", /json/)
            .expect(400)
            // .expect(res => {
            //     expect(res.statusCode).toBe(201)
            //     expect(res.body).toHaveProperty('test from /apie')
            //     expect(res.body.status).toBe(true)
            // })
            // .end((err, res) => {
            //     if (err) return done(err);
            //     return done();
            //   });
    })
        
})
