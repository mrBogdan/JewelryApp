<template>
    <button type="button" class="btn ripple default" @click="$emit('click-event')">
        <base-icon v-if="icon" :icon="icon" class="no-hover no-ripple" :title="$slots.default"/>
        <slot>Default button text</slot>
    </button>
</template>

<script>
    import BaseIcon from './BaseIcon';

    export default {
        name: 'Button',
        components: {
            BaseIcon
        },
        props: [
            'icon'
        ]
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
</style>