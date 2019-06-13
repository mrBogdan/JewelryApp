import { OrderService } from '../../services';

const os = new OrderService();

export const OrderMutations = {
    SET_ORDERS: 'SET_ORDERS'
};

export const OrderActions = {
    LOAD_ORDERS_BY_EMAIL: 'LOAD_ORDERS_BY_EMAIL',
};

const state = {
    orders: []
};

const getters = {
    orders: state => state.orders
};

const actions = {
    [OrderActions.LOAD_ORDERS_BY_EMAIL]({ commit }, email) {
        return os.getOrderByEmail(email)
            .then(res => {
                console.log('ORD', res);
                console.log('ORD', email);
                commit(OrderMutations.SET_ORDERS, res.data);
                return res;
            });
    }
};

const mutations = {
    [OrderMutations.SET_ORDERS](state, orders) {
        state.orders = orders;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}