const { PORT } = require('./common/config');
const app = require('./app');

/* eslint-disable no-console */
app.listen(PORT, () => console.log(`Server started pn PORT ${PORT}`));
