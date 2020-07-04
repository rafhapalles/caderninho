import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger } from './config/logger.js';
import { conectarMongoDB } from './config/Conexao.js';
import { PessoaRouter } from './routes/PessoaRoutes.js';
import { EmpresaRouter } from './routes/EmpresaRoutes.js';
import { AutenticacaoRouter } from './routes/AutenticacaoRoutes.js';

const app = express();
conectarMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.use(AutenticacaoRouter);
app.use(PessoaRouter);
app.use(EmpresaRouter);
app.listen(process.env.PORT, () =>
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`)
);
