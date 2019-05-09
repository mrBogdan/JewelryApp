<template>
    <div class="product">
        <router-link :to="{ name: 'product', params: { id: productItem.id } }">
            <img :src="productItem.imagePath" :alt="productItem.alt" class="product__image">
        </router-link>
        <div class="">
            <span>{{ productItem.name }}</span>
        </div>
        <div class="price">
            <span class="price__amount">{{ productItem.price }} </span>
            <span class="price__currency">{{ productItem.currency }}</span>
        </div>
        <button class="btn ripple">Add to cart</button>
    </div>
</template>

<script>
    export default {
        name: 'Product',
        props: [
            'productItem',
        ]
    };
</script>

<style scoped lang="sass">
    @import '../styles/button'
    @import '../styles/colors'

    $border-color: #96d0ff
    $border-width: 1px

    .product
        z-index: 22
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        position: relative

        &__image
            width: 100%

    .product:hover
        box-shadow: 1px 1px 3px 2px $shadow-color
</style>