<template>
    <div v-if="productItem.isActive" class="product" >
        <div class="add-to-cart" @click="addToCart(productItem.idProduct)">
            <icon :icon="faCartPlus" :tooltip-text="'Add to cart'" />
        </div>
        <router-link :to="{ name: 'product', params: { id: productItem.idProduct } }">
            <img :src="productItem.imagePath" class="product__image">

        <div class="product-value">
            <div class="product__name" :title="productItem.productName">
                <span class="with-underline--hover">{{ productItem.productName }}</span>
            </div>
            <div class="price">
                <span class="price__amount">{{ productItem.price }} </span>
                <span class="price__currency">{{ productItem.currency }}</span>
            </div>
        </div>
        </router-link>
    </div>
</template>

<script>
    import Icon from './BaseIcon'
    import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

    export default {
        name: 'Product',
        components: {
            Icon,
        },
        data: function() {
            return {
                faCartPlus
            }
        },
        props: [
            'productItem',
        ],
        methods: {
            addToCart(id) {
                console.log(id);
            }
        }
    };
</script>

<style scoped lang="sass">
    @import '../styles/button'
    @import '../styles/colors'
    @import '../styles/variables'
    @import '../styles/general'

    $border-color: #96d0ff
    $border-width: 1px

    .product
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        position: relative
        box-shadow: 0 5px 5px 2px $medium-grey
        transition: box-shadow .5s
        border-radius: 4px

        &__image
            width: 100%
            border-radius: 4px
            display: block

    .product:hover
        box-shadow: 0 5px 5px 2px rgba($medium-grey, 1)

    .product:hover .add-to-cart
        visibility: visible

    .product-value
        .product__name
            overflow: hidden
            white-space: nowrap
        padding: 16px
        font-size: 15px
        height: 60px
        background-color: $shadow-color
        width: 100%
        border-radius: 0 0 4px 4px

        .price
            color: rgba($dark-blue-grey, .7)
            font-size: 14px
            margin-top: 2px

    .add-to-cart
        visibility: hidden
        position: absolute
        bottom: 1.5 * $icon-container-height
        right: 0

</style>