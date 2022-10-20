const request = require('supertest')
const app = require('../app')

jest.setTimeout(90000)

describe('GET / ', () => {

    it('Return status 200 and payload list of games', async() => {
        const res = await request(app).get('/api/v1/')

        // console.log(res)
        expect(res.status).toBe(200)
        // expect(res.text).toBe('test from /api/v1')
        // expect(res.data).toBe('test from /api/v1')
    })
        
})
