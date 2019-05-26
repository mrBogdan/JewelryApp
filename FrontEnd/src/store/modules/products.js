import { ProductService } from '../../services';

export const ProductsMutations = {
    SET_PRODUCTS: 'SET_PRODUCTS'
};

export const ProductsActions = {
    SET_ALL_PRODUCTS: 'SET_ALL_PRODUCTS'
};

const state = {
    items: [],
};

const getters = {
    products: (state, getters) => {
        return state.items;
    }
};

const actions = {
    async [ProductsActions.SET_ALL_PRODUCTS]({ commit }) {
        const productService = new ProductService();
        const products = await productService.getAllProducts();
        console.log('PR', products.data.data);
        commit(ProductsMutations.SET_PRODUCTS, products.data.data);
    }
};

const mutations = {
    [ProductsMutations.SET_PRODUCTS](state, products) {
        state.items = products;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}