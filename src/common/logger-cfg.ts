import * as winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
};

const levelApp = Object.keys(levels)[Number(process.env.LOG_LEVEL)];

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      })
    ),
  }),
  new winston.transports.File({
    filename: 'logs/combined.log',
    format: winston.format.json(),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.json(),
  }),
];

export default {
  levelApp,
  levels,
  format,
  transports,
};
