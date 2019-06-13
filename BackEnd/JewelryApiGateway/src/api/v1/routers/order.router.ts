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
    .get(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }))
    .delete(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

router
    .route('/by-email/:email')
    .get(expressHttpProxy(orderServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

export default router;