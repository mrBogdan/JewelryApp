<template>
    <div class="home">
        <product-list :title="categoryName">
            <product v-for="product in products" :key="product.idProduct" :product-item="product"></product>
        </product-list>
    </div>
</template>

<script>
    import product from '../components/Product';
    import productList from '../components/ProductList';
    import products from '../mockData';
    import { mapGetters } from 'vuex';

    export default {
        name: 'home',
        data: function () {
            return {

            };
        },
        components: {
            productList,
            product,
        },
        computed: {
            categoryName: function () {
                return 'Product list';
            },
            ...mapGetters([
                'products'
            ])
        }
    };
</script>

<style lang="sass" scoped></style>
