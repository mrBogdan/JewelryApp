import { Router } from 'express'
import { ProductController } from '../controllers';

const productController: ProductController = new ProductController();

const productRouter: Router = Router();

productRouter
    .route('/all')
    .get(productController.get.bind(productController));

productRouter
    .route('/by-category/:idCategory')
    .get(productController.getByCategoryId.bind(productController));


productRouter
    .route('/:id')
    .get(productController.getById.bind(productController));

productRouter
    .route('/by-ids')
    .post(productController.getByIds.bind(productController));

export default productRouter;
