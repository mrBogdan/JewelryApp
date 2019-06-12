import { Router } from 'express';

const expressHttpProxy = require('express-http-proxy');
const config = require('../../../../config');

const router: Router = Router();
const contentServiceUrl = config.get('services:JewelryContentService');


router
    .route('/')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req) => {
            return req.originalUrl;
        }
    }));

export default router;