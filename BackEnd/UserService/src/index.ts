import * as express from 'express';
import logger from './modules/logger'
import * as session from 'express-session'
import api from './api/v1';
import * as bodyParser from 'body-parser';
import errorHttpHandler from './modules/handlers/errorHttpHandler';

const MSSQLStore = require('connect-mssql')(session);
const morgan = require('morgan');
const config = require('../config');

const app = express();

const PORT = config.get('port');

app
    .use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
    .use(bodyParser.json({ limit: '10mb' }))
    .use(session({
        store: new MSSQLStore(config.get('database')),
        secret: config.get('session:secret'),
        cookie: config.get('session:cookie'),
        saveUninitialized: config.get('session:saveUninitialized'),
        resave: config.get('session:resave')
    }))
    .use(morgan(':method :url :status :response-time ms'))
    .use('/api/v1/', api)
    .use(errorHttpHandler)
    .listen(PORT, () => {
        logger.info(`Server is running on ${PORT}`);
    });

