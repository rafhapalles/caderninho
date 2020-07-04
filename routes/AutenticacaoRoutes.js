import express from 'express';
import controller from '../controller/AutenticacaoController.js';

const app = express();

app.post('/autenticar', controller.autenticar);

export { app as AutenticacaoRouter };
