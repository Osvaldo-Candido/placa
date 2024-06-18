const database = require('../database/knex');
const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs');
class UserController {
  async index() {}

  async create(request, response) {
    const { name, category, location, business_hours, email, phone, password } =
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
    const hashPassword = await hash(password, 10);

    const [id] = await database('users').insert({
      name,
      category,
      location,
      business_hours,
      email,
      phone,
      password: hashPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    response.status(201).json({ id });
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
      category,
      location,
      business_hours,
      email,
      phone,
      password,
      old_password,
    } = request.body;

    const validCategories = [
      'restaurante',
      'placa livre',
      'geladaria',
      'hamburgaria',
      'churrascaria',
      'bar',
    ];

    const user = await database('users').where({ id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const checkEmail = await database('users')
      .where({ email })
      .andWhereNot({ id })
      .first();

    if (checkEmail) {
      throw new AppError('Já existe um usuário com este email!');
    }

    if (category && !validCategories.includes(category)) {
      throw new AppError('Categoria inválida', 401);
    }

    const updatedUser = {
      name: name || user.name,
      category: category || user.category,
      location: location || user.location,
      business_hours: business_hours || user.business_hours,
      email: email || user.email,
      phone: phone || user.phone,
      updated_at: new Date(),
    };

    if ((password && !old_password) || (!password && old_password)) {
      const message = password
        ? 'Preencha a palavra passe antiga'
        : 'Preencha a palavra passe nova';
      throw new AppError(message);
    }

    if (password && old_password) {
      const new_password = await compare(old_password, user.password);

      if (!new_password) {
        throw new AppError('A palavra não confere', 401);
      }
    }

    if (password) {
      updatedUser.password = await hash(password, 10);
    }

    await database('users').where({ id }).update(updatedUser);

    response.status(200).json({ message: 'Usuário atualizado com sucesso' });
  }

  async show() {}
}

module.exports = UserController;
