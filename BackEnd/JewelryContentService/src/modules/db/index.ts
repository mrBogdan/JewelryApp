import * as mssql from 'mssql'
import logger from '../logger'

const config = require('../../../config');

export default new mssql.ConnectionPool(config.get('database'))
    .connect()
    .then((pool: any) => {
        logger.info('Connected to mssql');
        return pool;
    })
    .catch((err: any) => logger.error(err));


