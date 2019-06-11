import { OrderService, ProductService } from '../../services';
import Vue from 'vue';

const orderService = new OrderService();

export const CartMutations = {
    SET_CART_PRODUCT: 'SET_CART_PRODUCT',
    SET_CART_PRODUCTS: 'SET_CART_PRODUCTS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    REMOVE_PRODUCT_FROM_CART_BY_ID: 'REMOVE_PRODUCT_FROM_CART_BY_ID',
    CLEAR_CART: 'CLEAR_CART',
};

export const CartActions = {
    SET_CART_PRODUCTS: 'SET_CART_PRODUCTS',
    SET_CART_PRODUCT: 'SET_CART_PRODUCT',
    REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART'
};

const state = {
    items: [],
    count: 0,
    currency: '$'
};

const getters = {
    cartCount: state => state.count,
    cartProducts: state => state.items,
    allPrice: function (state) {
        let sum = 0;
        state.items.forEach(item => {
            sum += (item.count * item.product.price);
            return sum;
        });
        return sum.toFixed(2);
    },
    currency: state => state.currency,
};

const actions = {
    [CartActions.SET_CART_PRODUCT]({ commit }, product) {
        commit(CartMutations.SET_CART_PRODUCT, product);
    },
    [CartActions.SET_CART_PRODUCTS]({ commit }, products) {
        const productService = new ProductService();

        commit(CartMutations.SET_CART_COUNT, orderService.getProductCount());
        const ids = products.products.map( item => item.idProduct);

        const counts = products.products.map( item => item.count);

        if (ids.length) {
            productService.getProductsByIds(ids)
                .then((products) => {
                    const productsArray = products.data.data;
                    const extendedProducts = counts.map( (item, index) => ({ count: item, product: productsArray[index] }) );

                    commit(CartMutations.SET_CART_PRODUCTS, extendedProducts);
                });
        }

    },
    [CartActions.REMOVE_PRODUCT_FROM_CART]({ commit }, { product }) {
        const productId = product.idProduct;

        commit(CartMutations.REMOVE_PRODUCT_FROM_CART_BY_ID, productId);
        orderService.removeFromCart(productId);
    }
};

const mutations = {
    [CartMutations.SET_CART_COUNT](state, count) {
        state.count = count;
    },
    [CartMutations.SET_CART_PRODUCT](state, product) {
        //const orderService = new OrderService();
        state.count += 1;

        const existsProduct = state.items.find( item => item.product.idProduct === product.idProduct );

        if (existsProduct) {
            existsProduct.count += 1;
        } else {
            state.items.push({
               product,
               count: 1
            });
        }
        Vue.$toast.success('Product added into cart');

        orderService.addToCart(product.idProduct);
    },
    [CartMutations.SET_CART_PRODUCTS](state, products) {
        state.items = products;
    },
    [CartMutations.REMOVE_PRODUCT_FROM_CART_BY_ID](state, productId) {
        let tmpCount;

        state.items.forEach( (item, idx) => {
            if (+item.product.idProduct === +productId) {
                tmpCount = state.count - item.count;
                state.items.splice(idx, 1);
            }
        });


        state.count = tmpCount;
    },
    [CartMutations.CLEAR_CART](state) {
        state.items.splice(0,state.items.length - 1);
        state.count = 0;

        orderService.clearCart();
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}