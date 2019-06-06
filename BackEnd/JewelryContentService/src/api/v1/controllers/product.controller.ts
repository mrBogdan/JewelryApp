import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../../../services/product.service';

const productService = new ProductService();

export class ProductController {
    public get(req: Request, res: Response, next: NextFunction) {
        productService.getAll()
            .then((products: any) => res.send(products))
            .catch(next);
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        productService.getById(req.params.id)
    }
}