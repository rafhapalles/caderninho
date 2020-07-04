import winston from 'winston';
//import winstondb from 'winston-mongodb';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `(${label}) ${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    // new transports.MongoDB({
    //   level: 'info',
    //   db: process.env.DB_URL_MONGODB,
    //   collection: 'logs_caderninho',
    //   capped: true,
    //   cappedMax: 20,
    //   options: {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   },
    // }),
  ],
  format: format.combine(
    label({ label: 'caderninho-api' }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };
