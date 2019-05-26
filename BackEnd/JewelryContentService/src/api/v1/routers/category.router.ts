import { Router } from 'express'
import { CategoryController } from '../controllers';

const categoryController: CategoryController = new CategoryController();

const categoryRouter: Router = Router();

categoryRouter
    .route('/all')
    .get(categoryController.get.bind(categoryController));

export default categoryRouter;
