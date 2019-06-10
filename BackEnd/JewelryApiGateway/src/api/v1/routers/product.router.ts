import { Router } from 'express'

const expressHttpProxy = require('express-http-proxy');
const config = require('../../../../config');

const router: Router = Router();
const contentServiceUrl = config.get('services:JewelryContentService');

router
    .route('/all')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

router
    .route('/by-category/:idCategory')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

router
    .route('/:id')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

router
    .route('/by-ids')
    .post(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

export default router;
