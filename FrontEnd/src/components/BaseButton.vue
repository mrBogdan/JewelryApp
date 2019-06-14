<template>
    <button class="btn ripple default">
        <slot>Default button text</slot>
    </button>
</template>

<script>
    export default {
        name: 'Button'
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
</style>