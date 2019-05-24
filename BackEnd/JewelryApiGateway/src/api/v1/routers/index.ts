import { Router } from 'express'

const expressHttpProxy = require('express-http-proxy');
const config = require('../../../../config');

const router: Router = Router();
const contentServiceUrl = config.get('services').JewelryContentService;
console.log(contentServiceUrl);

router
    .route('/all')
    .get(expressHttpProxy(contentServiceUrl, {
        proxyReqPathResolver: (req: Request) => {
            return `/api/v1/categories/all`;
        }
    }));

export default router;
