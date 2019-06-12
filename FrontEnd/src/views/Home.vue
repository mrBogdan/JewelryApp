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
    import { ProductsActions } from '../store/modules/products';
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
        created() {
            this.$store.dispatch( ProductsActions.SET_ALL_PRODUCTS);
        },
        computed: {
            categoryName: function () {
                return 'Product list';
            },
            ...mapGetters([
                'products'
            ])
        },
        mounted() {
          this.$emit('hello', {
              name: 'Bogdan'
          })
        }
    };
</script>

<style lang="sass" scoped></style>
