<template>
    <div class="home">
        <product-list :title="categoryName">
            <product v-for="product in products" :key="product.idProduct" :product-item="product"></product>
        </product-list>
    </div>
</template>

<script>
    import product from '../components/ProductListItem';
    import productList from '../components/ProductList';
    import { mapGetters } from 'vuex';
    import Pagination from '../components/Pagination';

    export default {
        name: 'home',
        data: function () {
            return {

            };
        },
        components: {
            Pagination,
            productList,
            product,
        },
        computed: {
            categoryName: function () {
                return 'Search page';
            },
            ...mapGetters([
                'products'
            ])
        }
    };
</script>

<style lang="sass" scoped></style>
