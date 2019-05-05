import express = require('express');
import { MainController } from '../controllers/main.controller';

const router = express.Router();
const mainController = new MainController();


router
    .route('/')
    .get(mainController.get.bind(mainController));

export default router;
