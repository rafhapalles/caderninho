import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

const gerarToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

export { gerarToken };
