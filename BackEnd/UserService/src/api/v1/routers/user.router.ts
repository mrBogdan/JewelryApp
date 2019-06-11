import * as express from 'express';
import { UserController } from '../controllers';
import { UserService } from '../../../services';
import dbPromise from '../../../modules/db';
import { upload } from '../../../modules/uploader';
import userVerify from '../../../modules/handlers/userVerify';

const userService = new UserService(dbPromise);
const userController = new UserController(userService);
const router = express.Router();

//userController.getUserFromToken.bind(userController)
router
    .get('/get-user', userVerify, userController.getUserFromToken.bind(userController));

router
    .post('/signup', upload.single('file'), userController.signup.bind(userController))
    .post('/signin', userController.signin.bind(userController))
    .post('/logout', userVerify, userController.logout.bind(userController))
    .post('/refresh', userController.refreshToken.bind(userController));


export default router;
