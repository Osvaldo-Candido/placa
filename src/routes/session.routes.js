const { Router } = require('express');
const SessionController = require('../controllers/SessionController');

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/create', sessionController.session);

module.exports = sessionRoutes;
