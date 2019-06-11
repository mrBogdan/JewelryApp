import { UserService } from '../../services';

const userService = new UserService();

export const UserMutations = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
};

export const UserActions = {
    SET_USER: 'SET_USER'
};

const state = {
    user: {},
    auth: false
};

const getters = {
    user: state => state.user,
    auth: state => state.auth,
    isAdmin: state => state.user.bIsAdmin
};

const actions = {
    [UserActions.SET_USER]({ commit }) {
        userService.getUserWithToken()
            .then((user) => {
                commit(UserMutations.SET_USER, user.data);
            })
            .catch(error => {
                this.$toast.error('Please clear cache, and reload page');
            })
    }
};

const mutations = {
    [UserMutations.SET_USER](state, user) {
        state.user = user;
        state.auth = true;
    },
    [UserMutations.LOGOUT](state) {
        delete state.user;
        state.auth = false;

        userService.logout();
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}