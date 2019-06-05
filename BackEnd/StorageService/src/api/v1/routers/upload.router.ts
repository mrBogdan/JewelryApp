import express = require('express');
import { UploadController } from '../controllers/upload.controller';
import { Router } from 'express';
import { upload } from '../../../modules/utils';

const router: Router = express.Router();
const uploadController: UploadController = new UploadController();

router
    .route('/upload')
    .post(upload.single('file'), uploadController.uploadAndSaveFile.bind(uploadController));

router.
    route('/:name')
    .get(uploadController.getFile);

export {
    router
};
