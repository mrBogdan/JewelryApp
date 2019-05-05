import * as express from 'express';
import router from './routers';

const { services } = require('../../../config/app.json');

const app = express();

app.use(router);

export default app;
