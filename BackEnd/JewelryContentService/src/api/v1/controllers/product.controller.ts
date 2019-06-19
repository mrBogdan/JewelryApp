import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../../../services/product.service';
import { HttpError } from '../../../modules/errors/http.error';
import { DEFAULT } from '../../../consts';
import { uploadToStorageService } from '../../../services/upload.service';
const config = require('../../../../config');

const productService = new ProductService();

export class ProductController {
    public get(req: Request, res: Response, next: NextFunction) {
        const top = +req.query.top || 8;
        const offset = +req.query.offset || 0;

        productService.getAll(top, offset)
            .then((products: any) => res.send(products))
            .catch(next);
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        productService.getById(req.params.id)
            .then((product: any) => res.send(product))
            .catch(next)
    }

    public getByCategoryId(req: Request, res: Response, next: NextFunction) {
        productService.getByCategoryId(req.params.idCategory)
            .then((products: any) => res.send(products))
            .catch(next);
    }

    public getByIds(req: Request, res: Response, next: NextFunction) {
        const ids: number[] = req.body.ids;
        productService.getByIds(ids)
            .then((products: any) => res.send(products))
            .catch(next)
    }

    public deleteById(req: Request, res: Response, next: NextFunction) {
        if (!req['decoded'].isAdmin) {
            throw new HttpError(403, 'Forbidden');
        }

        const id: number = req.params.id;

        productService.deleteById(id)
            .then(() => res.sendStatus(200))
            .catch(next)
    }

    public create(req: Request, res: Response, next: NextFunction) {
        if (!req['decoded'].isAdmin) {
            throw new HttpError(403, 'Forbidden');
        }

        let imagePath: string = DEFAULT;
        console.log(req.file);
        if (req.file) {
            imagePath = req.file.path;
        }

        uploadToStorageService(imagePath)
            .then((filePath: string) => {

                return productService.create(this.prepareProductModel(req.body, filePath))
                    .then((product: any) => res.send(product))

            })
            .catch(next);


    }

    private prepareProductModel(reqBody, filePath) {
        console.log(reqBody);
        return {
            productName: reqBody.productName,
            productDescr: reqBody.productDescr,
            idCategory: reqBody.idCategory,
            price: reqBody.price,
            imagePath: `${config.get('services:StorageService')}/api/v1/${filePath}`
        }

    }
}
