const AppError = require('../utils/AppError');
const database = require('../database/knex');

class PostController {
  async index(request, response) {
    try {
      const posts = await database('posts').where({ speciality: 'sim' });
      return response.json(posts);
    } catch {
      throw new AppError('Não foi possível carregar os dados');
    }
  }

  async create(request, response) {
    const {
      user_id,
      category,
      name,
      price,
      current_price,
      description,
      speciality,
    } = request.body;
    const images = request.files;

    try {
      const [id] = await database('posts').insert({
        user_id,
        category,
        name,
        price,
        current_price,
        description,
        speciality,
      });

      const imagesPost = images.map(async (file) => {
        await database('imagesPosts').insert({
          image: file.filename,
          id_post: id,
        });
      });

      await Promise.all(imagesPost);
      return response.status(201).json();
    } catch {
      throw new AppError('Erro ao fazer o post');
    }
  }

  async show(request, response) {
    const id = request.params;

    try {
      const post = await database('posts').where({ id });
      return response.json({ post });
    } catch {
      throw new AppError('Não foi possível carregar o produto');
    }
    return response.json(id);
  }

  async delete() {}
}

module.exports = PostController;
