<template>
    <div class="icon-wrapper">
        <button class="icon ripple btn" @click="onClick" @mouseover="showTooltipMethod(true)" @mouseleave="showTooltipMethod(false)">
            <font-awesome-icon :icon="icon" size="lg" />
        </button>
        <tooltip :position="tooltipPosition" :show="showTooltip" >{{ tooltipText }}</tooltip>
    </div>
</template>

<script>
    import Tooltip from './BaseTooltip'

    export default {
        name: 'Icon',
        components: {
            Tooltip,
        },
        data: function() {
            return {
                showTooltip: false,
                showPopup: false
            }
        },
        props: {
            icon: {
                type: Object,
                required: true
            },
            tooltipText: {
                type: String,
                require: false
            },
            tooltipPosition: {
                type: String,
                require: false,
            },
            hasPopup: {
                type: Boolean,
                default: false
            },
            onClick: {
              type: Function,
              default: () => {},
            },
        },
        methods: {
            showTooltipMethod(doShow) {
                this.showTooltip = !!(doShow && this.tooltipText);
            },
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
        transition: background-color .5s, color .5s
        &:hover
            background-color: $icon-hover-grey
            color: $dark-blue-grey

    .no-hover
        .icon
            &:hover
                background-color: transparent

    .no-riple
        .icon

</style>