import * as express from 'express';
import { Express } from 'express';

import { categoryRouter, productRouter } from './routers';

const app: Express = express();

app.use('/category', categoryRouter);
app.use('/product', productRouter);

export default app;
