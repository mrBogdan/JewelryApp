<template>
    <div class="categories">
    </div>
</template>

<script>
    import product from '../components/ProductListItem';
    import productList from '../components/ProductList';

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