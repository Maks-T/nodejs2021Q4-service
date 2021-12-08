import { config } from './common/config';
import app from './app';

app.listen(config.PORT as string, () => console.log(`Server started`));
