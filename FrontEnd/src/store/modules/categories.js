import { CategoryService } from '../../services/CategoryService'

export const CategoriesMutations = {
    SET_CATEGORIES: 'SET_CATEGORIES'
};

export const CategoriesActions = {
    GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES'
};

const state = {
    items: [],
};

const getters = {
    categories: (state, getters) => {
        return state.items;
    }
};

const actions = {
    [CategoriesActions.GET_ALL_CATEGORIES]({ commit }) {
        const categoryService = new CategoryService();
        categoryService.getCategories()
            .then(categories => commit(CategoriesMutations.SET_CATEGORIES, categories))
    }
};

const mutations = {
    [CategoriesMutations.SET_CATEGORIES](state, categories) {
        state.items = categories;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}