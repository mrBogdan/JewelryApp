import * as express from 'express';
import { Express } from 'express';
import router from './routers';

const app: Express = express();

app
    .use(router);

export default app;
