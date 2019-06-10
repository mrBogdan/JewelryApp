import * as express from 'express';
import { Express } from 'express';

import { categoryRouter, productRouter, searchRouter } from './routers';

const app: Express = express();

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/search', searchRouter);

export default app;
