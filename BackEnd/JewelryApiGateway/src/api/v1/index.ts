import * as express from 'express';
import { Express } from 'express';

import { productRouter, categoryRouter, searchRouter, orderRouter } from './routers';

const app: Express = express();

app
    .use('/category', categoryRouter)
    .use('/product', productRouter)
    .use('/search', searchRouter)
    .use('/order', orderRouter);

export default app;
