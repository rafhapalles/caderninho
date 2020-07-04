import { Pessoa } from '../model/Pessoa.js';
import { logger } from '../config/logger.js';
import { gerarToken } from '../helpers/TokenHelper.js';

const findAll = async (_, res) => {
  try {
    const pessoas = await Pessoa.find({});
    logger.info(`Get /findAll pessoas - ${JSON.stringify(pessoas)}`);
    return res.send(pessoas);
  } catch (error) {
    logger.info(`Get /findAll pessoas Error - ${error}`);
    return res
      .status(500)
      .send('Ocorreu um erro ao retornar as pessoas cadastradas: ' + error);
  }
};

const create = async (req, res) => {
  const { email } = req.body;

  try {
    if (await Pessoa.findOne({ email }))
      return res
        .status(400)
        .send({ erro: 'O E-mail cadastrado já se encontra em uso.' });

    const pessoa = await Pessoa.create(req.body);
    pessoa.senha = undefined;
    logger.info(`Post /create pessoa - ${JSON.stringify(pessoa)}`);
    return res.send({ pessoa, token: gerarToken({ id: pessoa._id }) });
  } catch (error) {
    logger.info(`Post /create pessoa - ${error}`);
    return res
      .status(500)
      .send({ error: 'Ocorreu um erro durante a operação: ' + error });
  }
};

export default { findAll, create };
