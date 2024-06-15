const { Router } = require('express');
const UserController = require('../controllers/UserController');

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/save', userController.save);

module.exports = userRoutes;
