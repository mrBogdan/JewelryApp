<template>
    <div class="tooltip" :class="position" v-if="show">
        <slot class="tooltiptext">Tooltip text</slot>
    </div>
</template>

<script>
    export default {
        name: 'Tooltip',
        props: {
            position: {
                type: String,
                default: 'bottom'
            },
            show: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/variables"

    .tooltip
        background-color: $dark-blue-grey
        color: $white
        width: 100px
        text-align: center
        border-radius: 6px
        padding: 5px 0
        position: absolute
        z-index: 1
        top: $icon-container-width
        left: -74%
        transition: opacity 0.3s
        
        &::after
            content: ""
            position: absolute
            margin-left: -5px
    
        &.bottom::after
            top: -10px
            left: 50%
            border-width: 5px
            border-style: solid
            border-color: transparent transparent $dark-blue-grey transparent
        

</style>