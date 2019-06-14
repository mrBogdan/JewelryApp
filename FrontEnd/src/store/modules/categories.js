import { CategoryService } from '../../services/CategoryService'

export const CategoriesMutations = {
    SET_CATEGORIES: 'SET_CATEGORIES'
};

export const CategoriesActions = {
    SET_ALL_CATEGORIES: 'SET_ALL_CATEGORIES',
    CATEGORY_NAME: 'CATEGORY_NAME',
};

const state = {
    items: [],
};

const getters = {
    categories: state => {
        return state.items;
    },
};

const actions = {
    async [CategoriesActions.SET_ALL_CATEGORIES]({ commit }) {
        const categoryService = new CategoryService();
        const categories = await categoryService.getCategories();
        commit(CategoriesMutations.SET_CATEGORIES, categories.data.data);
        return categories;
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