<template>
    <header class="header">
        <div class="container">
            <div class="logo">
                <router-link to="/">Jewelry</router-link>
            </div>
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </div>
            <div class="actions">
                <button class="btn">Sign in</button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
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


    .container
        display: flex
        justify-content: space-between
        align-items: center
        height: 100%


    .logo
        font: 20px/24px Arial, sans-serif
        font-weight: bold

</style>