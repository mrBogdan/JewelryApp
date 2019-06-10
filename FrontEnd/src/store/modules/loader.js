export const LoaderMutations = {
    START_LOADING: 'START_LOADING',
    STOP_LOADING: 'STOP_LOADING'
};

export const ProductsActions = {};

const state = {
    isLoading: false,
};

const getters = {
    isLoading: state => state.isLoading,
};

const actions = {};

const mutations = {
    [LoaderMutations.START_LOADING](state) {
        state.isLoading = true;
    },
    [LoaderMutations.STOP_LOADING](state) {
        state.isLoading = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}