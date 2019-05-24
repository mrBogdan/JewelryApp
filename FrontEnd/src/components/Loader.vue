<template>
    <div v-if="isLoading" class="loader-wrapper">
        <div class="loader"></div>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            toggle() {
                this.isLoading = !this.isLoading;
            }
        }
    };
</script>

<style scoped lang="sass">
    .loader-wrapper
        position: absolute
        top: 0
        left: 0

    .loader
        border: 16px solid #f3f3f3
        border-top: 16px solid #3498db
        border-radius: 50%
        width: 120px
        height: 120px
        animation: spin 2s linear infinite

    @keyframes spin
        0%
            transform: rotate(0deg)
        100%
            transform: rotate(360deg)
</style>