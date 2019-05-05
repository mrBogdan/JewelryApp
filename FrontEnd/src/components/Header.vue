<template>
    <header class="header">
        <div class="logo">LogoTip</div>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <div class="login">
            <button>OK</button>
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

    .header
        width: 100%
        border: 1px solid $dark-blue
        background-color: $yellow
        height: 100px
        display: flex
        justify-content: space-between
        align-items: center

</style>