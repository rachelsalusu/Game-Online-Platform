const GameDetailController = require('../../controllers/game.detail.controller');
const gameDetailRouter = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');

/**
 * @Routes "/api/v1/GameDetail"
 */

gameDetailRouter.get('/', isAuthenticated, GameDetailController.getGameDetail);
gameDetailRouter.post('/', isAuthenticated, GameDetailController.createGameDetail);
gameDetailRouter.get('/:id', isAuthenticated, GameDetailController.getGameDetailById);
gameDetailRouter.put('/:id', isAuthenticated, GameDetailController.updateGameDetail);
gameDetailRouter.delete('/:id', isAuthenticated, GameDetailController.deleteGameDetail);

module.exports = gameDetailRouter;
