<template>
    <div class="sidebar-container">
        <h2>{{ title }} <i class="fa fa-id-card" aria-hidden="true"></i></h2>
        <ul class="category-list">
            <li v-if="category.isActive" v-for="(category, index) in categoriesArray" :key="index" class="category-item">
                <router-link :to="{ name: 'category', params: { id: category.idCategory } }">{{ category.categoryName }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        props: [
            'title',
            'categoriesArray'
        ]
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    ul
        background-color: $light-grey
        padding: 0

        li
            list-style: none

    .category-item > a
        font-size: 15px
        display: block
        padding: 15px
        border-bottom: 1px solid $shadow-color
        &:hover,
        &.router-link-active
            background-color: #f5f5f5
            border-left: 5px solid $shadow-color
    


</style>