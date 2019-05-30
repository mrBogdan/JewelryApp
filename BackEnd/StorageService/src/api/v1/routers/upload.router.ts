import express = require('express');
import { UploadController } from '../controllers/upload.controller';
import { Router } from 'express';

const router: Router = express.Router();
const uploadController: UploadController = new UploadController();

router
    .route('/upload')
    .post(uploadController.uploadAndSaveFile.bind(uploadController));

export {
    router
};
