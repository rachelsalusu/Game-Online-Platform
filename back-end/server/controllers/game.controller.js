const { Game } = require('../models');
const { Op } = require('sequelize');

class GameController {
  static async createGame(req, res, next) {
    try {
      const { name, desc, thumbnail_url} = req.body;
      if (!name || !desc || !thumbnail_url) {
        return res.status(400).json({
          result: 'Failed',
          message: 'name, description and thumbnails must be fill !',
        });
      }
      const newGame = {
        name: name ? name : null,
        desc: desc ? desc : null,
        thumbnail_url: thumbnail_url ? thumbnail_url : null,
      };

      const createdGame = await Game.create(newGame);
      if (createdGame) {
        return res.status(201).json({
          result: 'Success',
          data: createdGame,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGames(req, res, next) {
    try {
      let conditions = [];
      const { name, desc} = req.query;
      if (name) {
        conditions.push({ game });
      }
      if (desc) {
        conditions.push({ desc });
      }

      const data = await Game.findAll({
        where: {
          [Op.and]: conditions,
        },
      });
      if (data) {
        return res.status(200).json({
          result: 'Success',
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const gameId = await Game.findByPk(id);
      if (gameId) {
        return res.status(200).json({
          result: "Success",
          data: gameId,
        });
      } else {
        return res.status(404).json({
          result: "Not found",
          message: `Game with ${id} not found`
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id)
      if (!game) return res.status(404).json({ result: "Not found", message: `Game with ${id} not found` })
      const updateGame = await Game.update(req.body, {
        where: { id: id },
      });
      if (updateGame == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Game with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: "failed",
          message: "Failed to update",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await Game.destroy({
        where: { id: id },
      });
      if (destroyed == 1) {
        res.status(200).json({
          result: "Success",
          message: `Game with id: ${id}, was successfully deleted`,
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot delete Game with id=${id}. Maybe Game was not found!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = GameController;
