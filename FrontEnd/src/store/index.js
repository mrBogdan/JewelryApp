import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories';
import products from './modules/products';
import loader from './modules/loader';
import cart from './modules/cart';
import user from './modules/user';
import order from './modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        categories,
        products,
        loader,
        cart,
        user,
        order
    }
});
