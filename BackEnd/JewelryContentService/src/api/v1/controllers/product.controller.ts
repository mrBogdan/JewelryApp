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
}