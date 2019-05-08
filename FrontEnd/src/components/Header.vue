<template>
    <header class="header">
        <div class="container">
            <div class="logo">
                <router-link to="/"><span class="logo-text">J</span></router-link>
            </div>
            <div id="nav">
                <router-link to="/categories">Categories</router-link> |
                <router-link to="/about">About</router-link>
            </div>
            <div class="actions">
                <label class="search" :data-state="state">
                    <font-awesome-icon :icon="faSearch" class="icon-hover" size="lg" />
                    <input type="text" class="search-field" @click="state = 'open'" @blur="state='close'" name="search" placeholder="Search ... ">
                </label>

                <div class="cart ripple">
                    <font-awesome-icon :icon="faShoppingCart" class="icon-hover" size="lg" />
                </div>
                <div class="sign-in ripple">
                    <font-awesome-icon :icon="faSignInAlt" class="icon-hover" size="lg" />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faSearch } from '@fortawesome/free-solid-svg-icons'
    import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
    import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "Header",
        components: [
            FontAwesomeIcon
        ],
        data: function () {
            return {
                faSearch,
                faShoppingCart,
                faSignInAlt,
                state: 'close'
            }
        },
    }

    let prevScrollPos = window.pageYOffset;

    window.onscroll = function() {
        const headerElem = document.querySelector("header.header");
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            headerElem.style.top = "0";
        } else {
            headerElem.style.top = "-50px";
        }

        prevScrollPos = currentScrollPos;
    }
</script>

<style scoped lang="sass">
    @import "../styles/colors.sass"
    @import "../styles/button"
    @import "../styles/variables"

    .header
        width: 100%
        border-bottom: 1px solid #cccccc
        background-color: $header-bgc
        height: $header-height
        box-shadow: 0 1px 4px $shadow-color
        padding: 0 $side-padding
        opacity: .8
        position: fixed
        top: 0
        left: 0
        z-index: 30
        transition: top .3s


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
        border: 3px solid black
        width: 30px
        height: 30px
        transition: all .5s
        &:hover
            color: white
            background-color: black


    .search-field
        transition: width 1s ease, opacity 0.5s ease 0.5s
        opacity: 1
        width: 180px
        height: 25px
        border: 0
        outline: none
        padding: 0 0 0 5px


    .actions > *
        margin-right: 10px

    .actions > *:last-child
        margin-right: 0

    .actions,
    .cart,
    .sign-in
        display: flex
        justify-content: center
        align-items: center

    .cart,
    .sign-in
        width: 40px
        height: 40px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        border-radius: 50%

        img
            width: 30px

    .icon-hover
        transition: color .3s
    .icon-hover:hover
        color: #505050
    .search
        cursor: pointer
        position: relative
        display: inline-block
        background-color: #fff
        padding: 5px 12px
        transition: all 1s ease
        border-radius: 0
        &::after
            content: ''
            display: block
            height: 2px
            width: 80%
            background-color: #F0AD4E
            transition: all 1s ease 0.5s

        input
            transition: width 1s ease, opacity 0.5s ease 0.5s
            opacity: 1
            width: 180px
            height: 25px

            border: 0
            outline: none
            color: #966c38
        &[data-state="close"]
            border-radius: 30px
            padding: 5px 5px
            transition: all 1s ease
            &::after
                width: 0
                transition: all 0.3s ease
            input
                width: 0
                height: 0
                opacity: 0
                cursor: pointer
                transition: opacity 0.5s ease, width 1s ease

    
</style>