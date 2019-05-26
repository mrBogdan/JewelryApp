import { Router } from 'express'
import { ProductController } from '../controllers';

const productController: ProductController = new ProductController();

const productRouter: Router = Router();

productRouter
    .route('/all')
    .get(productController.get.bind(productController));

export default productRouter;
