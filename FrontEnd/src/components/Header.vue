<template>
    <header class="header showHeader">
        <div class="container">
            <div class="logo">
                <router-link to="/"><span class="logo-text">J</span></router-link>
            </div>
            <!--
            <div id="nav">
                <router-link to="/categories">Categories</router-link> |
                <router-link to="/about">About</router-link>
            </div>-->
            <div>
                <div class="search" >
                    <icon :icon="faSearch" @click="" class="search-icon" />
                    <input type="text" autocomplete="off" class="search-field" name="search" placeholder="Search ... ">
                </div>
            </div>
            <div class="actions">
                <icon :icon="faQuestionCircle" :tooltip-text="'Help'" />
                <icon :icon="faShoppingCart" :tooltip-text="'Your Cart'"/>
                <icon :icon="faSignInAlt" :tooltip-text="'Sign in'" />
            </div>
        </div>
    </header>
</template>

<script>
    import { faSearch } from '@fortawesome/free-solid-svg-icons'
    import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
    import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
    import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
    import Icon from '../components/Icon'

    export default {
        name: "Header",
        components: {
            Icon
        },
        data: function () {
            return {
                faSearch,
                faShoppingCart,
                faSignInAlt,
                faQuestionCircle,
                state: 'close'
            }
        },
    }

    let prevScrollPos = window.pageYOffset;

    window.onscroll = function() {
        const headerElem = document.querySelector("header.header");
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            headerElem.classList.add('showHeader');
        } else {
            headerElem.classList.remove('showHeader');
        }

        prevScrollPos = currentScrollPos;
    }
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"
    @import "../styles/variables"

    .header
        width: 100%
        border-bottom: 1px solid #cccccc
        background-color: $header-bgc
        height: $header-height
        box-shadow: 0 5px 5px $shadow-color
        padding: 0 $side-padding
        opacity: .8
        position: fixed
        top: -$header-height
        left: 0
        z-index: 30
        transition: top .3s

    .showHeader
        top: 0

    .container
        display: flex
        justify-content: space-between
        align-items: center
        height: 100%

    .logo-text
        display: flex
        justify-content: center
        align-items: center
        font: 20px/24px Arial, sans-serif
        font-weight: bold
        border: 3px solid $black
        width: 30px
        height: 30px
        transition: all .5s
        &:hover
            color: $white
            background-color: $black


    .search
        position: relative

    .search-icon
        position: absolute
        top: 2px
        left: 2px

    .search-field
        opacity: 1
        width: 360px
        border: 2px solid $grey
        background-color: $white
        outline: none
        height: $search-height
        padding: 5px 0 5px $icon-container-width
        border-radius: 5px
        transition: background-color .5s
        font-size: 18px

    .search-field:focus
        background-color: $grey


    .actions > *
        margin-right: 10px

    .actions > *:last-child
        margin-right: 0

    .actions
        display: flex
        justify-content: center
        align-items: center
</style>