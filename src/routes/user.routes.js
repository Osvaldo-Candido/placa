const { Router } = require('express');
const UserController = require('../controllers/UserController');

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/create', userController.create);
userRoutes.put('/update/:id', userController.update);

module.exports = userRoutes;
