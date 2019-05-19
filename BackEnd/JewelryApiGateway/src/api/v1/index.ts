import * as express from 'express';
import { Express } from 'express';
import router from './routers';

const app: Express = express();

export default router(app);
