<template>
    <div class="product-page">
        <div class="product-wrapper">
            <div class="content-container">
                <div>
                    <img :src="product.imagePath" :alt="product.productName">
                </div>
                <div class="product-description">
                    <div>
                        <h2>{{ product.productName }}</h2>
                    </div>
                    <div class="product-value">
                        <div class="price">
                            <span class="price__amount">{{ product.price }} </span>
                            <span class="price__currency">{{ product.currency }}</span>
                        </div>
                        <div>
                            <base-button @click-event="addToCart">Add to cart</base-button>
                        </div>
                    </div>
                    <div class="description">
                        {{ product.productDescr }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ProductService } from '../services';
    import { LoaderMutations } from '../store/modules/loader';
    import { CartActions } from '../store/modules/cart';
    import BaseButton from '../components/BaseButton';

    export default {
        name: 'ProductPage',
        components: {
            BaseButton
        },
        data: function () {
            return {
                product: ''
            };
        },
        created() {
            this.$store.commit(LoaderMutations.START_LOADING);
            const id = this.$route.params.id;
            const productService = new ProductService();

            productService.getProductById(id)
                .then((product) => {
                    this.product = product.data.data;
                })
                .catch(err => {
                    this.$store.commit(LoaderMutations.STOP_LOADING);
                    this.$router.push({ name: 'notFound' });
                });
        },
        mounted() {
            this.$store.commit(LoaderMutations.STOP_LOADING);
        },
        methods: {
            addToCart() {
                console.log('ADD');
                this.$store.dispatch(CartActions.SET_CART_PRODUCT, this.product);
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
    @import "../styles/colors"

    .product-page
        margin-top: 15px

    img
        width: 300px
        margin-right: 20px

    .content-container
        display: flex

    .product-description
        display: flex
        flex-direction: column

        & > *
            margin: 10px 0

    .product-value
        display: flex
        flex-direction: column
        justify-content: center
        align-items: flex-start

        & > *
            margin: 10px 0

</style>