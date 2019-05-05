import * as express from 'express';

const appConfig: any = require('../config/app.json');
const app: express = express();
import api from './api/v1';

const PORT: number = appConfig.port;

app
   .use('/api/v1/', api)
   .listen(PORT, () => {
       console.log('Server is running on ', PORT);
   });
