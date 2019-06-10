import * as express from 'express';
import { Express } from 'express';

import { productRouter, categoryRouter, searchRouter } from './routers';

const app: Express = express();

app
    .use('/category', categoryRouter)
    .use('/product', productRouter)
    .use('/search', searchRouter);

export default app;
