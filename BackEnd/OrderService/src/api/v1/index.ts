import * as express from 'express';
import router from './routers/order.router';

const app = express();

app.use('/order', router);

export default app;
