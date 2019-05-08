<template>
    <div class="footer">
        {{ footerText }}
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data: function () {
            return {
                footerText: "Jewelry Single Page App | 2019 | ©"
            }
        }
    }
</script>

<style scoped lang="sass">
    @import '../styles/colors'

    .footer
        height: 50px
        width: 100%
        background-color: black
        color: #fff
        display: flex
        justify-content: center
        align-items: center
</style>