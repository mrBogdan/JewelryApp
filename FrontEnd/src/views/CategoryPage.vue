<template>
    <div class="categories">
        <product-list :title="categoryName">
            <product v-for="(product, index) in products" :key="index" :product-item="product"></product>
        </product-list>
    </div>
</template>

<script>
    import product from '../components/ProductListItem';
    import productList from '../components/ProductList';
    import { ProductsActions } from '../store/modules/products';
    import { mapGetters } from 'vuex';

    export default {
        name: 'CategoryPage',
        data: function () {
            return {
                categoryName: '',
            };
        },
        components: {
            productList,
            product,
        },
        computed: {
            ...mapGetters({
                products: 'products',
            })
        },
        created() {
            console.log('Category page created');
            this.fetchProducts();
        },
        methods: {
            fetchProducts() {
                this.$store.dispatch(ProductsActions.SET_BY_CATEGORY, this.$route.params.id)
                    .then(() => {
                        const categoryId = +this.$route.params.id;
                        this.categoryName =
                            this.$store.getters.categories.find( item => item.idCategory === categoryId).categoryName;
                    });
            }
        },
        watch: {
            '$route': 'fetchProducts'
        }
    };
</script>

<style scoped lang="sass">
    .categories
        position: relative
</style>