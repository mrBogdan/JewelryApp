<template>
    <transition name="fade">
        <div v-if="isOpen" class="popup-wrapper">
            Pop up
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Popup',
        data: function () {
            return {
                isOpen: false
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    .popup-wrapper
        position: absolute
        top: 100%
        left: 0
        width: 100px
        height: 150px
        border: 1px solid black
        background-color: $white

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0
</style>