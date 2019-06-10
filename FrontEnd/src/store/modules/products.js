import { ProductService } from '../../services';

const productService = new ProductService();

export const ProductsMutations = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_PRODUCT: 'SET_PRODUCT'
};

export const ProductsActions = {
    SET_ALL_PRODUCTS: 'SET_ALL_PRODUCTS',
    SET_BY_CATEGORY: 'SET_BY_CATEGORY',
    GET_BY_ID: 'GET_BY_ID',
};

const state = {
    items: [],
    item: null,
};

const getters = {
    products: state => state.items,
    getProductById: state => id => {
        return state.items.find(item => item.idProduct === id);
    },
    getProductByCategory: state => idCategory => {
        return state.items.filter( item => item.idCategory === idCategory );
    },
    getProduct: state => state.item,
};



const actions = {
    async [ProductsActions.SET_ALL_PRODUCTS]({ commit }) {
        const products = await productService.getAllProducts();
        commit(ProductsMutations.SET_PRODUCTS, products.data.data);
    },

    async [ProductsActions.SET_BY_CATEGORY]({ commit }, idCategory) {
        const products = await productService.getProductsByCategoryId(idCategory);
        commit(ProductsMutations.SET_PRODUCTS, products.data.data);
    },
    async [ProductsActions.GET_BY_ID]({ commit }, id) {
        const product = await productService.getProductById(id);
        commit(ProductsMutations.SET_PRODUCT, product.data.data);
    }
};

const mutations = {
    [ProductsMutations.SET_PRODUCTS](state, products) {
        state.items = products;
    },
    [ProductsMutations.SET_PRODUCT](state, product) {
        state.item = product;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}