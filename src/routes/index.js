const { Router } = require('express');
const userRoutes = require('./user.routes');
const postRoutes = require('./posts.routes');
const sessionRoutes = require('./session.routes');
const routes = Router();

routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);
routes.use('/session', sessionRoutes);
module.exports = routes;
