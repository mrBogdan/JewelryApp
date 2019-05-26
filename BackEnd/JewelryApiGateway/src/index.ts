import * as express from 'express';
import logger from './modules/logger';
import * as cors from 'cors';

const morgan = require('morgan');

const config = require('../config');
const app = express();
import api from './api/v1';

const PORT = config.get('port');

app
    .use(cors())
    .use(morgan(':method :url :status :response-time ms'))
    .use('/api/v1/', api)
    .listen(PORT, () => {
        logger.info(`Server is running on ${PORT}`);
    });
