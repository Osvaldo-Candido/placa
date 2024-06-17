const { Router } = require('express');
const multer = require('multer');
const PostController = require('../controllers/PostController');
const { storage } = require('../Configs/uploadConfig');

const postRoutes = Router();
const postController = new PostController();

const upload = multer({ storage });

postRoutes.post('/create', upload.array('images', 10), postController.create);
postRoutes.post('/:id', postController.show);
postRoutes.get('/', postController.index);

module.exports = postRoutes;
