import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pessoa } from '../model/Pessoa.js';
import authConfig from '../config/auth.json';

const router = express.Router();

router.get('/pessoa', async (_, res) => {
  const pessoas = await Pessoa.find({});

  try {
    return res.send(pessoas);
  } catch (error) {
    return res
      .status(500)
      .send('Ocorreu um erro ao retornar as pessoas cadastradas: ' + error);
  }
});

router.post('/pessoa', async (req, res) => {
  const { email } = req.body;

  try {
    if (await Pessoa.findOne({ email }))
      return res
        .status(400)
        .send({ erro: 'O E-mail cadastrado já se encontra em uso.' });

    const pessoa = await Pessoa.create(req.body);
    pessoa.senha = undefined;

    return res.send({ pessoa, token: gerarToken({ id: pessoa._id }) });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Ocorreu um erro durante a operação: ' + error });
  }
});

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/autenticar', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const pessoa = await Pessoa.findOne({ email }).select('senha');

    if (!pessoa)
      return res.status(400).send({ Erro: 'Usuário não encontrado!' });

    if (!(await bcrypt.compare(senha, pessoa.senha)))
      return res.status(400).send({ Erro: 'Senha incorreta!' });

    pessoa.senha = undefined;

    return res.send({ pessoa, token: gerarToken({ id: pessoa._id }) });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Ocorreu um erro durante sua requisição: ' + error });
  }
});

export { router as PessoaController };
