import { ProductService } from '../../services';

const productService = new ProductService();

export const ProductsMutations = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_PRODUCT: 'SET_PRODUCT',
    SET_PRODUCT_COUNT: 'SET_PRODUCT_COUNT',
};

export const ProductsActions = {
    SET_ALL_PRODUCTS: 'SET_ALL_PRODUCTS',
    SET_BY_CATEGORY: 'SET_BY_CATEGORY',
    GET_BY_ID: 'GET_BY_ID',
    SET_ALL_PRODUCT_COUNT: 'SET_ALL_PRODUCT_COUNT',
};

const state = {
    items: [],
    allCount: 0
};

const getters = {
    products: state => state.items,
    productCount: state => state.allCount
};



const actions = {
    async [ProductsActions.SET_ALL_PRODUCTS]({ commit }) {
        const products = await productService.getAllProducts();
        commit(ProductsMutations.SET_PRODUCTS, products.data.data);
        commit(ProductsMutations.SET_PRODUCT_COUNT, products.data.count);
        return products;
    },

    async [ProductsActions.SET_BY_CATEGORY]({ commit }, idCategory) {
        const products = await productService.getProductsByCategoryId(idCategory);
        commit(ProductsMutations.SET_PRODUCTS, products.data.data);
        return products;
    },
    async [ProductsActions.GET_BY_ID]({ commit }, id) {
        const product = await productService.getProductById(id);
        commit(ProductsMutations.SET_PRODUCT, product.data.data);
        return product;
    },
};

const mutations = {
    [ProductsMutations.SET_PRODUCTS](state, products) {
        state.items = products;
    },
    [ProductsMutations.SET_PRODUCT_COUNT](state, count) {
        state.allCount = count;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}