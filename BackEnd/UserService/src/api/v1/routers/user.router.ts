import express = require('express');
import { UserController } from '../controllers';
import { UserService } from '../../../services';
import dbPromise from '../../../modules/db';

const userService = new UserService(dbPromise);
const userController = new UserController(userService);
const router = express.Router();

router
    .post('/signup', userController.signup.bind(userController))
    .post('/signin', userController.signin.bind(userController))
    .post('/logout', userController.logout.bind(userController));


export default router;
