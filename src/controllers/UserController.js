const database = require('../database/knex');
const AppError = require('../utils/AppError');

class UserController {
  async index() {}

  async create(request, response) {
    const { name, category, location, business_hours, email, phone } =
      request.body;

    //Um array com as categorias para comparação com os dados a receber pelo input
    const validCategories = [
      'restaurante',
      'placa livre',
      'geladaria',
      'hamburgaria',
      'churrascaria',
      'bar',
    ];

    const checkEmail = await database('users').where({ email }).first();

    if (checkEmail) {
      throw new AppError('Já existe um usuário com este email!');
    }

    if (!validCategories.includes(category)) {
      throw new AppError('Categoria inválido', 401);
    }

    const [id] = await database('users').insert({
      name,
      category,
      location,
      business_hours,
      email,
      phone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    response.status(201).json({ id });
  }

  async show() {}
}

module.exports = UserController;
