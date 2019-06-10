import { BaseService } from './BaseService';
import axios from 'axios'
import { OrderService } from '../settings/services'

const CART = 'CART';

export class OrderService extends BaseService {
    constructor() {
        super();
        this.$http = axios.create({
            baseURL: OrderService
        })
    }
    addToCart(id) {
        const cart = localStorage.getItem(CART);
        let products = null;

        if (cart) {
            products = JSON.parse(cart);
            products.count += 1;

            const existsProduct = products.products.find(item => item.idProduct === id);

            if (existsProduct) {
                existsProduct.count += 1;
            } else {
                products.products.push({ idProduct: id, count: 1 });
            }

        } else {
            products = {
                count: 1,
                products: [{ idProduct: id, count: 1 }],
            };
        }

        localStorage.setItem(CART, JSON.stringify(products));

        return products.count;
    }

    getProducts() {
        const cart = localStorage.getItem(CART);

        if (!cart) {
            return {
                count: 0,
                products: []
            };
        }

        return JSON.parse(cart);
    }

    getProductCount() {
        const cart = localStorage.getItem(CART);
        if (!cart) {
            return 0;
        }

        let count = 0;

        try {
            const cartObj = JSON.parse(cart);
            if (cartObj) {
                count = cartObj.count;
            }
        } catch (e) {
            return 0;
        }

        return count;
    }

    clearCart() {
        localStorage.setItem(CART, '');
    }

    makeOrder(products, user) {

    }

    removeFromCart(id) {
        const cart = localStorage.getItem(CART);

        if (!cart) return;

        const { count, products } = JSON.parse(cart);

        let tmpCount = count;

        products.forEach((item, idx) => {
            if (+item.idProduct === +id) {
                tmpCount = count - item.count;
                products.splice(idx, 1);
            }
        });

        localStorage.setItem(CART, JSON.stringify({
            count: tmpCount,
            products,
        }));
    }
}