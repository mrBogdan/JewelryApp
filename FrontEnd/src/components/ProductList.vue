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
        border: 1px solid
        display: grid
        grid-template-columns: repeat(3, 1fr)
        grid-gap: 20px
        padding: 5px


</style>