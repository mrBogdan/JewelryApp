<template>
    <footer class="footer">
        {{ footerText }}
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data: function () {
            return {
                footerText: `Jewelry Single Page App | ${new Date().getFullYear()} | ©`
            }
        }
    }
</script>

<style scoped lang="sass">
    @import '../styles/colors'
    @import '../styles/variables'

    .footer
        height: $footer-height
        width: 100%
        background-color: $grey
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        left: 0
        bottom: 0
</style>