import express = require('express');
import { OrderController } from '../controllers/order.controller';
import userVerify from '../../../modules/handlers/userVerify';

const router = express.Router();
const orderController = new OrderController();


router
    .route('/')
    .get(userVerify, orderController.get.bind(orderController))
    .post(orderController.create.bind(orderController))
    .put(orderController.update.bind(orderController));

router
    .route('/:id')
    .get(userVerify, orderController.getById.bind(orderController))
    .delete(orderController.delete.bind(orderController));

router
    .route('/by-email/:email')
    .get(userVerify, orderController.getByEmail.bind(orderController));

export default router;
