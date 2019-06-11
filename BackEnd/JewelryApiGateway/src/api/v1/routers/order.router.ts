import { Router } from 'express';

const expressHttpProxy = require('express-http-proxy');
const config = require('../../../../config');

const router: Router = Router();
const orderServiceUrl = config.get('services:OrderService');


router
    .route('/')
    .get(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }))
    .post(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }))
    .put(expressHttpProxy(orderServiceUrl, {

        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

router
    .route('/:id')
    .delete(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

export default router;