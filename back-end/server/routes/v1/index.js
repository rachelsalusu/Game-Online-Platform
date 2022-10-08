const userRouter = require('./user.routes');
const gameRouter = require('./game.routes');
const v1 = require('express').Router();

v1.get('/', (_, res) => {
  res.send('test from /api/v1');
});

v1.use('/users', userRouter);
v1.use('/games', gameRouter);

module.exports = v1;
