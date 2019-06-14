import { OrderService } from '../../services';

const os = new OrderService();

export const OrderMutations = {
    SET_ORDERS: 'SET_ORDERS',
    SET_USER_ORDERS: 'SET_USER_ORDERS'
};

export const OrderActions = {
    LOAD_ORDERS_BY_EMAIL: 'LOAD_ORDERS_BY_EMAIL',
};

const state = {
    orders: [],
    userOrders: [],
};

const getters = {
    orders: state => state.orders,
    userOrders: state => state.userOrders
};

const actions = {
    [OrderActions.LOAD_ORDERS_BY_EMAIL]({ commit }, email) {
        return os.getOrderByEmail(email)
            .then(res => {
                commit(OrderMutations.SET_USER_ORDERS, res.data);
                return res;
            });
    }
};

const mutations = {
    [OrderMutations.SET_ORDERS](state, orders) {
        state.orders = orders;
    },
    [OrderMutations.SET_USER_ORDERS](state, orders) {
        state.userOrders = orders;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}