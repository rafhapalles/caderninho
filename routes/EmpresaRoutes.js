import express from 'express';
import { Empresa } from '../model/Empresa.js';

const app = express();

app.get('/student', async (_, res) => {
  const empresas = await Empresa.find({});

  try {
    res.send(empresas);
  } catch (error) {
    res.status(500).send('Erro aos listar as empresasa: ' + error);
  }
});

export { app as EmpresaRouter };
