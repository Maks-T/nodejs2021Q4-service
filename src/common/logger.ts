import winston from 'winston';
import { config } from './config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
};

const level = Object.keys(levels)[Number(config.LOG_LEVEL)];

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

export const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});
