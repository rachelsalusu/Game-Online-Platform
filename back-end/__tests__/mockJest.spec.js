import {jest, describe, test, expect} from '@jest/globals'

const game = require('../server/controllers/game.controller.js')
const mockRequest = (body = {}) => ({
    body
})
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe('fetch game controller', ()=> {
    test('res.json called with {status:true, message: "game list"}', () => {
        const req = mockRequest()
        const res = mockResponse()
        game.getGames(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            status: true,
            message: "game list"
        })
    })
})