import { BaseService } from './BaseService';

const CART = 'CART';

export class OrderService extends BaseService {
    addToCart(id) {
        const cart = localStorage.getItem(CART);
        let products = null;
        console.log('11111');

        if (cart) {
            products = JSON.parse(cart);
            products.count += 1;
            
            const existsProduct = products.products.find( item => item.idProduct === id);

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
        localStorage.setItem(CART, "");
    }

    makeOrder() {

    }

    removeFromCart(id) {

    }
}