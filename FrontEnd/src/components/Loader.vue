<template>
    <transition name="fade">
        <div v-if="isLoading" class="loader-wrapper">
            <div class="loader"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Loader',
        props: ['isLoading']
    };
</script>

<style scoped lang="sass">
    .loader-wrapper
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(255,255,255, 0.8)

    .loader
        position: absolute
        top: 50%
        left: 50%
        border: 8px solid #f3f3f3
        border-top: 8px solid #3498db
        border-radius: 50%
        width: 60px
        height: 60px
        animation: spin 2s linear infinite

    @keyframes spin
        0%
            transform: rotate(0deg)
        100%
            transform: rotate(360deg)

    .fade-leave-active
        transition: 1s
</style>