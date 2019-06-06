<template>
    <div class="product-page">
        <div class="product-value">
            <div class="product__name" :title="product.productName">
                <span class="with-underline--hover">{{ product.productName }}</span>
            </div>
            <div class="price">
                <span class="price__amount">{{ product.price }} </span>
                <span class="price__currency">{{ product.currency }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ProductPage',
        data: function () {
            const product = this.$store.getters.getProductById(this.$route.params.id);

            return {
                product
            };
        }
    };
</script>

<style scoped lang="sass">
    .product-page
        margin-top: 15px
</style>