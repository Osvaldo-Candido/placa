const database = require('../database/knex');
const AppError = require('../utils/AppError');
const authConfig = require('../Configs/authConfig');

async function ensureAuthentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('token não informado');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    next();
  } catch {
    throw new AppError('JWT inválido');
  }
}

module.exports = ensureAuthentication;
