import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ erro: 'Token não encontrado no Header' });

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return res.status(401).send({ erro: 'Token inválido.' });

  if (!/^Bearer$/i.test(parts[0]))
    return res.status(401).send({ erro: 'Token desconhecido.' });

  jwt.verify(parts[1], authConfig.secret, (error, decoded) => {
    if (error) return res.status(401).send({ erro: 'Token inválido' });

    req.userId = decoded.id;
    return next();
  });
};

export { authMiddleware };
