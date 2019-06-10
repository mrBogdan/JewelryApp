<template>
    <div v-if="$store.getters.productCount > 8" class="pagination-wrapper">
        <div><router-link to="/page/1">1</router-link></div>
        <div>
        </div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'Pagination'
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    .pagination-wrapper
        display: flex
        justify-content: center
        margin-top: 15px
        div
            width: 50px
            height: 50px
            border: 1px solid $blue-shadow-color
            display: flex
            justify-content: center
            align-items: center
            cursor: pointer
            margin-right: 15px
        div:last-child
            margin-right: 0


</style>