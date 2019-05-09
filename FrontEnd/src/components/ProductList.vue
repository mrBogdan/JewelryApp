<template>
    <div>
        <div>
            <h2>{{ title }}</h2>
        </div>
        <div class="productList">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductList',
        props: [
            'title'
        ]
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    .productList
        display: grid
        grid-template-columns: repeat(3, minmax(150px, 250px))
        grid-gap: 20px
        padding: 5px

    @media screen and (max-width: 768px)

</style>