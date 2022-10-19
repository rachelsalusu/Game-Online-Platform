const GameController = require('../../controllers/game.controller');
const gameRouter = require('express').Router();
const gameDetailRouter = require('./game.detail.routes');
const isAuthenticated = require('../../middlewares/isAuthenticated');

/**
 * @Routes "/api/v1/Users"
 */

gameRouter.use('/detail', gameDetailRouter);

gameRouter.get('/', GameController.getGames);
gameRouter.post('/', isAuthenticated, GameController.createGame);
gameRouter.get('/:id', isAuthenticated, GameController.getGameById);
gameRouter.put('/:id', isAuthenticated, GameController.updateGame);
gameRouter.delete('/:id', isAuthenticated, GameController.deleteGame);

module.exports = gameRouter;
