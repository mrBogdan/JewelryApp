import { Router } from 'express'
import { ProductController } from '../controllers';
import userVerify from '../../../modules/handlers/userVerify';
import { upload } from '../../../modules/uploader';

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
    .get(productController.getById.bind(productController))
    .delete(userVerify, productController.deleteById.bind(productController));

productRouter
    .route('/by-ids')
    .post(productController.getByIds.bind(productController));

productRouter
    .route('/create')
    .post(userVerify, upload.single('file'), productController.create.bind(productController));

export default productRouter;
