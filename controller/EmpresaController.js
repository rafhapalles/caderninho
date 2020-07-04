import { Empresa } from '../model/Empresa.js';
import { logger } from '../config/logger.js';

const findAll = async (req, res) => {
  try {
    const empresas = await Empresa.find({});

    logger.info(`Get /findAll empresas - ${JSON.stringify(empresas)}`);
    return res.send({ userId: req.userId, empresas });
  } catch (error) {
    logger.error(`Get /findAll empresas Erro - ${error}`);
    return res.status(500).send({ erro: error });
  }
};

export default { findAll };
