import { createConnection } from 'typeorm';
import { config } from './common/config';
import app from './app';
import configORM from './ormconfig';

createConnection(configORM)
  .then((connection) => {
    connection.runMigrations();
    /* eslint-disable no-console */
    app.listen(config.PORT as string, () =>
      console.log(`Server started port: ${config.PORT}`)
    );
  })
  .catch((e) => {
    process.stderr.write(`${e} DATABASE`);
    process.exit(1);
  });
