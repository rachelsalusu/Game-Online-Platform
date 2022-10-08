import { testJest } from '../testJest.js'


describe (' CalculatorService' , () => {
    let service;

    beforeEach ( () => {
        service = new testJest ()
    })

    describe ( '#sum' , () => {
       it ('1 + 1 should return 2'), () => {
            expect service.sum(1,1)).toEqual (2)
       })
    }

})



         