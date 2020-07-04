import bcrypt from 'bcryptjs';
import { logger } from '../config/logger.js';
import { Pessoa } from '../model/Pessoa.js';
import { gerarToken } from '../helpers/TokenHelper.js';

const autenticar = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const pessoa = await Pessoa.findOne({ email }).select('senha');

    if (!pessoa)
      return res.status(400).send({ Erro: 'Usuário não encontrado!' });

    if (!(await bcrypt.compare(senha, pessoa.senha)))
      return res.status(400).send({ Erro: 'Senha incorreta!' });

    pessoa.senha = undefined;

    logger.info(`Post /autenticar - ${JSON.stringify(pessoa)}`);
    return res.send({ pessoa, token: gerarToken({ id: pessoa._id }) });
  } catch (error) {
    logger.error(`Post /autenticar Erro - ${error}`);

    return res
      .status(500)
      .send({ error: 'Ocorreu um erro durante sua requisição: ' + error });
  }
};

export default { autenticar };
