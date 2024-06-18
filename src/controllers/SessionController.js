const database = require('../database/knex');
const AppError = require('../utils/AppError');
const authConfig = require('../Configs/authConfig');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

class SessionController {
  async session(request, response) {
    const { email, password } = request.body;

    const user = await database('users').where({ email }).first();

    if (!user) {
      throw new AppError('Email ou palavra passe errado ');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Email ou palavra passe errado ');
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.status(200).json({ token, user });
  }
}

module.exports = SessionController;
