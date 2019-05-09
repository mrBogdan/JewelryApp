<template>
    <div class="categories">
        <product-list :title="categoryName">
            <product v-for="(product, index) in products" :key="index" :product-item="product"></product>
        </product-list>
    </div>
</template>

<script>
    import product from '../components/Product';
    import productList from '../components/ProductList';
    import products from '../mockData'

    export default {
        name: 'Categories',
        data: function() {
            return {
                categoryName: `Category page ${this.$route.params.id}`,
                products: products.products,
            }
        },
        components: {
            productList,
            product,
        },
        beforeRouteUpdate (to, from, next) {
            this.categoryName = `Category page ${to.params.id}`;
            next();
        }
    };
</script>

<style scoped>

</style>