import express from 'express';
import controller from '../controller/PessoaController.js';

const app = express();

app.get('/pessoa', controller.findAll);
app.post('/pessoa', controller.create);

export { app as PessoaRouter };
