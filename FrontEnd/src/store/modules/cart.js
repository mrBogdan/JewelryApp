import { OrderService, ProductService } from '../../services';

export const CartMutations = {
    SET_CART_PRODUCT: 'SET_CART_PRODUCT',
    SET_CART_PRODUCTS: 'SET_CART_PRODUCTS',
    SET_CART_COUNT: 'SET_CART_COUNT'
};

export const CartActions = {
    SET_CART_PRODUCTS: 'SET_CART_PRODUCTS',
    SET_CART_PRODUCT: 'SET_CART_PRODUCT'
};

const state = {
    items: [],
    count: 0,
};

const getters = {
    cartCount: state => state.count,
    cartProducts: state => state.items,
};

const actions = {
    [CartActions.SET_CART_PRODUCT]({ commit }, product) {
        console.log('COMMIT ', product);
        commit(CartMutations.SET_CART_PRODUCT, product);
    },
    [CartActions.SET_CART_PRODUCTS]({ commit }, products) {
        const productService = new ProductService();
        const orderService = new OrderService();

        commit(CartMutations.SET_CART_COUNT, orderService.getProductCount());
        const ids = products.products.map( item => item.idProduct);

        const counts = products.products.map( item => item.count);

        if (ids.length) {
            console.log('IDS', ids);
            productService.getProductsByIds(ids)
                .then((products) => {
                    const productsArray = products.data.data;
                    const extendedProducts = counts.map( (item, index) => ({ count: item, product: productsArray[index] }) );

                    commit(CartMutations.SET_CART_PRODUCTS, extendedProducts);
                });
        }

    }
};

const mutations = {
    [CartMutations.SET_CART_COUNT](state, count) {
        state.count = count;
    },
    [CartMutations.SET_CART_PRODUCT](state, product) {
        const orderService = new OrderService();
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

        orderService.addToCart(product.idProduct);
    },
    [CartMutations.SET_CART_PRODUCTS](state, products) {
        state.items = products;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}