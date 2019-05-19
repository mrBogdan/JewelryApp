import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'

const categoryController: CategoryController = new CategoryController();

const router: Router = Router();

router
    .route('/all')
    .get(categoryController.get.bind(categoryController));

export default router;
