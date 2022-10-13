import {test, expect} from '@jest/globals'
const sum = require('../components/testJest');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});