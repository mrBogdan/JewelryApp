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
                            <button class="btn ripple cart" @click="addToCart">Add to cart</button>
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
    import { OrderService } from '../services';
    import { LoaderMutations } from '../store/modules/loader';
    import { CartActions } from '../store/modules/cart';

    const orderService = new OrderService();

    export default {
        name: 'ProductPage',
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
                console.log('DISPACHED', this.product);
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

    .cart
        width: 250px
        height: 50px
        background-color: $medium-grey
        font: 16px / 24px Arial, sans-serif

</style>