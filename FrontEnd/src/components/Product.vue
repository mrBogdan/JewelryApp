<template>
    <div class="product">
        <router-link :to="{ name: 'product', params: { productId: productItem.id } }">
            <img :src="productItem.imagePath" :alt="productItem.alt" class="product__image">
        </router-link>
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

    $border-color: $red

    .product
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        position: relative
        border: 1px solid $grey

        &__image
            width: 250px

</style>