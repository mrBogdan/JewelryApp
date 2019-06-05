import * as express from 'express';
import logger from './modules/logger';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import errorHttpHandler from './modules/handlers/errorHttpHandler';

const morgan = require('morgan');

const config = require('../config');
const app = express();
import api from './api/v1';

const PORT = config.get('port');

app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
    .use(bodyParser.json({ limit: '10mb' }))
    .use(morgan(':method :url :status :response-time ms'))
    .use('/api/v1/', api)
    .use(errorHttpHandler)
    .listen(PORT, () => {
        logger.info(`Server is running on ${PORT}`);
    });
