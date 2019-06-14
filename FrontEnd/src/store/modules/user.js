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
    isAdmin: state => state.user.bIsAdmin,
};

const actions = {
    [UserActions.SET_USER]({ commit }) {
        return userService.getUserWithToken()
            .then((user) => {
                console.log('UU', user);
                commit(UserMutations.SET_USER, user.data);
            })
            .catch(error => {
                if (error.response.status === 401 && userService.getRefreshToken()) {
                    userService.refreshToken()
                        .then(res => {
                            commit(UserMutations.SET_USER, res.data.user);

                            userService.setUserToken(res.data.access_token);
                            userService.setRefreshToken(res.data.refresh_token);

                            return res;
                        })
                        .catch(err => {
                            userService.logout();
                        });
                }
            });
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
};