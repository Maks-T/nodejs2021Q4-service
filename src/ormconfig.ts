import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({
  path: path.join(__dirname, './../local-db.env'),
});

const configORM: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
console.log('configORM  ', configORM);

export default configORM;
