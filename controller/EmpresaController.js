import { Empresa } from '../model/Empresa.js';

const findAll = async('/empresa', (req, res) => {
  res.send({ ok: true, userId: req.userId });
});

export { findAll };
