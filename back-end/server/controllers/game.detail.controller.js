const { GameDetail, User } = require('../models');
const { Op } = require('sequelize');

class GameDetailController {
  static async createGameDetail(req, res, next) {
    try {
      const { user_id, game_id, score} = req.body;
      if (!user_id || !game_id || !score) {
        return res.status(400).json({
          result: 'Failed',
          message: 'user_id, game_id and score must be fill !',
        });
      }
      const newGameDetail = {
        user_id: user_id ? user_id : null,
        game_id: game_id ? game_id : null,
        score: score ? score : null,
      };

      const createdGameDetail = await GameDetail.create(newGameDetail);
      if (createdGameDetail) {
        return res.status(201).json({
          result: 'Success',
          data: createdGameDetail,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGameDetail(req, res, next) {
    try {
      let conditions = [];
      const { user_id, game_id, score } = req.query;

      
      if (user_id) {
        conditions.push({ user_id });
      }
      if (game_id) {
        conditions.push({ game_id });
      }
      if (score) {
        conditions.push({ score });
      }
      console.log(conditions)
      //console.log('ini hasil dari query' + re)

      const data = await GameDetail.findAll({
        where: {
          [Op.and]: conditions,
        },
        include: User
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

  static async getGameDetailById(req, res, next) {
    try {
      const { id } = req.params;
      const gameDetailById = await GameDetail.findByPk(id);
      if (gameDetailById) {
        return res.status(200).json({
          result: "Success",
          data: gameDetailById,
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

  static async updateGameDetail(req, res, next) {
    try {
      const { id } = req.params;
      const gameDetail = await GameDetail.findByPk(id)
      if (!gameDetail) return res.status(404).json({ result: "Not found", message: `Game Detail with ${id} not found` })
      const updateGameDetail = await GameDetail.update(req.body, {
        where: { id: id },
      });
      if (updateGameDetail == 1) {
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

  static async deleteGameDetail(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await GameDetail.destroy({
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

module.exports = GameDetailController;
