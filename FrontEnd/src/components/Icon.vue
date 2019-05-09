<template>
    <div class="icon-wrapper">
        <div class="icon ripple" @mouseover="showTooltipMethod(true)" @mouseleave="showTooltipMethod(false)">
            <font-awesome-icon :icon="icon" size="lg" />
        </div>
        <tooltip :position="tooltipPosition" :show="showTooltip" >{{ tooltipText }}</tooltip>
    </div>
</template>

<script>
    import Tooltip from '../components/Tooltip'

    export default {
        name: 'Icon',
        components: {
          Tooltip
        },
        data: function() {
            return {
                showTooltip: false
            }
        },
        props: [
            'icon',
            'tooltipText',
            'tooltipPosition'
        ],
        methods: {
            showTooltipMethod(doShow) {
                if (doShow && this.tooltipText) this.showTooltip = true;
                else this.showTooltip = false
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"
    @import "../styles/variables"

    .icon-wrapper
        position: relative

    .icon
        width: $icon-container-width
        height: $icon-container-height
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        border-radius: 50%
        transition: all .5s

        &:hover
            background-color: $icon-hover-grey
            color: $dark-blue-grey
</style>