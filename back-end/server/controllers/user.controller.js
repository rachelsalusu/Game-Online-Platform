const { hashPassword, verifyPassword } = require('../utils/passwordHandler');
const { User } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, confPassword } = req.body;

      if (!username || !email) {
        return res.status(400).json({
          result: 'Failed',
          message: 'username or email cannot empty',
        });
      }

      if (!password) {
        return res.status(400).json({
          result: 'Failed',
          message: 'password cannot be empty',
        });
      }

      if (password != confPassword) {
        return res.status(400).json({
          result: 'Failed',
          message: `password don't match`,
        });
      }

      const newUser = {
        username,
        email,
        password: await hashPassword(password),
      };

      const createdUser = await User.create(newUser);

      if (createdUser) {
        return res.status(201).json({
          result: 'Register successfully!',
          data: createdUser,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      const generateToken = () => {
        const payload = {
          id: user.id,
        };
        const credentials = 'ini token khusus chapter 10 tim 1';
        const token = jwt.sign(payload, credentials);
        return token;
      };

      const format = (user, includeToken) => {
        const { id, username } = user;
        const formattedUser = {
          id,
          username,
        };

        if (includeToken) {
          formattedUser.accessToken = generateToken();
        }

        return formattedUser;
      };

      if (!user) {
        return res.status(200).json({
          result: 'failed',
          message: 'User not found!',
        });
      }

      const checkPass = verifyPassword(password, user.dataValues.password);
      if (!checkPass) {
        return res.status(200).json({
          result: 'failed',
          message: 'Wrong password!',
        });
      }

      return res.status(200).json({
        result: 'Success',
        data: format(user, true),
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      let conditions = [];
      const { username, email } = req.query;
      if (username) {
        conditions.push({ username });
      }
      if (email) {
        conditions.push({ email });
      }

      const data = await User.findAll({
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

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = await User.findByPk(id);
      if (userId) {
        return res.status(200).json({
          result: 'Success',
          data: userId,
        });
      } else {
        return res.status(404).json({
          result: 'Not found',
          message: `User with ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const userId = await User.findByPk(id);
      if (!userId) return res.status(404).json({ result: 'Not found', message: `User with ${id} not found` });

      const { password, name, desc, address, sosmed_url, image_url } = req.body;

      if (password) {
        return res.status(501).json({
          result: 'failed',
          message: 'Internal Server Error.',
        });
      }

      const updatedUser = await User.update(
        { name, desc, address, sosmed_url, image_url },
        {
          where: { id: id },
        }
      );
      if (updatedUser == 1) {
        return res.status(200).json({
          result: 'Success',
          message: `User with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: 'failed',
          message: 'Failed to update',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // static async updateExperience(req, res, next) {
  //   try {
  //     const { exp } = req.body;
  //     const { id } = req.params;
  //     if (!exp) {
  //       return res.status(400).json({
  //         result: 'Failed',
  //         message: 'Exp field cannot be empty',
  //       });
  //     }

  //     const User = await User.findByPk(id);
  //     if (!userIdr) return res.status(404).json({ result: 'Not found', message: `User with ${id} not found` });

  //     if (User) {
  //       let expValue = User.experience + parseInt(exp);
  //       let lvlValue = Math.floor(expValue / LEVEL_BAR) == User.lvl ? User.lvl : User.lvl + 1;

  //       const updateLvl = await User.update(
  //         {
  //           experience: expValue,
  //           lvl: lvlValue,
  //         },
  //         { where: { id: id } }
  //       );
  //       if (updateLvl == 1) {
  //         res.status(200).json({
  //           result: 'SUCCESS',
  //           message: `User with id = ${id} gain ${exp} experience. Total experience = ${User.experience}`,
  //         });
  //       } else {
  //         res.status(400).json({
  //           result: 'FAILED',
  //           message: `Cannot update User with id=${id}!`,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await User.destroy({
        where: { id: id },
      });
      if (destroyed == 1) {
        res.status(200).json({
          result: 'Success',
          message: `User with id: ${id}, was deleted successfully`,
        });
      } else {
        res.status(400).json({
          result: 'FAILED',
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
