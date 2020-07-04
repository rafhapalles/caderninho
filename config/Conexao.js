import mongoose from 'mongoose';
import { logger } from './logger.js';

const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info('Banco MongoDB conectado com sucesso!.');
  } catch (error) {
    logger.error('Ocorreu um erro ao conectar ao banco. ' + error);
    return false;
  }
};

export { conectarMongoDB };
