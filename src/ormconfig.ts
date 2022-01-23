import { ConnectionOptions } from 'typeorm';
import { config } from './common/config';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = config;

const configORM: ConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [`./src/resources/**/*.entity{.ts,.js}`],
  logging: false,
  dropSchema: false,
  migrations: ['./src/migration/**/*.{ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: './src/migration',
  },
};

export default configORM;
