const UserController = require('../../controllers/user.controller');
const userRouter = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');

/**
 * @Routes "/api/v1/users"
 */

userRouter.get('/', isAuthenticated, UserController.getUsers);
userRouter.post('/', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.get('/:id', isAuthenticated, UserController.getUserById);
userRouter.put('/:id', isAuthenticated, UserController.updateUser);
userRouter.delete('/:id', isAuthenticated, UserController.deleteUser);

module.exports = userRouter;
