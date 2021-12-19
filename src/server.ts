import { config } from './common/config';
import app from './app';

/* eslint-disable no-console */
app.listen(config.PORT as string, () => console.log(`Server started`));
