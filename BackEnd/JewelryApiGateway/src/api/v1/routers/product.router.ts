import { Router } from 'express'

const expressHttpProxy = require('express-http-proxy');
const config = require('../../../../config');

const router: Router = Router();
const contentServiceUrl = config.get('services:JewelryContentService');

router
    .route('/all')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: () => {
            return `/api/v1/product/all`;
        }
    }));

export default router;
