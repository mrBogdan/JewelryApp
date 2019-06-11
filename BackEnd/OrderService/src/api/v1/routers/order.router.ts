import express = require('express');
import { OrderController } from '../controllers/order.controller';

const router = express.Router();
const orderController = new OrderController();


router
    .route('/')
    .get(orderController.get.bind(orderController))
    .post(orderController.create.bind(orderController))
    .put(orderController.update.bind(orderController));

router
    .route('/:id')
    .delete(orderController.delete.bind(orderController));

export default router;
