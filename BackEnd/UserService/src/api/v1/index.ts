import * as express from 'express';
import router from './routers/user.router';

const app = express();

app.use('/user', router);

export default app;
