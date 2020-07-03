import express from 'express';
import mongoose from 'mongoose';
import { EmpresaRouter } from './routes/EmpresaRoutes.js';
const app = express();

(async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_DRIVER}${process.env.DB_USER}:${process.env.DB_PWD}${process.env.DB_SERVER}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log('Erro ao conectar no MongoDB');
  }
})();

app.use(express.json());
app.use(EmpresaRouter);

app.listen(process.env.PORT, () => console.log('Conectado ao banco'));
