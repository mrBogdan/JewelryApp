import { NextFunction, Request, Response } from 'express';
import { OrderService } from '../../../services/order.service';
import { HttpError } from '../../../modules/errors/http.error';

const orderService = new OrderService();

export class OrderController {
    public get(req: Request, res: Response, next: NextFunction) {
        orderService.get()
            .then((orders) => res.send(orders))
            .catch(next);
    }

    public create(req: Request, res: Response, next: NextFunction) {
        const user = req.body.user;
        const products = req.body.products;
        const price = req.body.price;

        orderService.create(user, price, products)
            .then((rowsAffected: any) => {
                if (!rowsAffected.length) {
                    throw new HttpError(500, 'Server error');
                }

                res.sendStatus(200);
            })
            .catch(next);
    }

    public update(req: Request, res: Response, next: NextFunction) {

    }

    public delete(req: Request, res: Response, next: NextFunction) {
        const orderId = req.params.id;

        orderService.delete(orderId)
            .then(() => res.sendStatus(200))
            .catch(next);
    }
}