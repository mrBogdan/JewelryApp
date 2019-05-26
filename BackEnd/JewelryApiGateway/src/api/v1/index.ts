import * as express from 'express';
import { Express } from 'express';

import { productRouter, categoryRouter } from './routers';

const app: Express = express();

app
    .use('/category', categoryRouter)
    .use('/product', productRouter);

export default app;
