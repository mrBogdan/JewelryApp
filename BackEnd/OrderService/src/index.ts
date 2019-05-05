import * as express from 'express';

const appConfig = require('../config/app.json');
const app = express();
import api from './api/v1';

const PORT = appConfig.port;

app
   .use(api)
   .listen(PORT, () => {
       console.log('Server is running on ', PORT);
   });
