<script setup lang="ts">
    // Variables passed to this component are props
    const props = defineProps({
        alignment: {
            type: String,
            default: 'left'
        }
    })
</script>

<!-- Template with defined slots -->
<!-- Currently, content by default goes to the one without a name -->
<!-- Slot 'Icon' has no implementation yet -->
<template lang="">
    <div class="speech-bubble" :class="alignment">
        <slot name="icon"></slot>
        <slot class="text">
            
        </slot>
        <div class="arrow"></div>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .speech-bubble {
        border-radius: 20px;
        color: $clr-primary;
        margin: 5px;
        padding: .35em;
        padding-inline: 1.75em;
        width: fit-content;
        position: relative;

        max-width: 50ch;
        word-wrap: break-word;
        &.left {
            align-self: flex-start;
            background-color: $clr-accent-1;

            .arrow {
                z-index: -1;
                width: 0; 
                height: 0; 
                border-bottom: 20px solid $clr-accent-1;
                border-left: 50px solid transparent;
                left: 0px;
                bottom: 0px;
                transform: translateY(-.05em) translateX(-2.5em) rotate(-15deg);
                position: absolute;
            }
        }
        &.right {
            align-self: flex-end;
            background-color: $clr-secondary;

            .arrow {
                z-index: -1;
                width: 0; 
                height: 0; 
                border-bottom: 20px solid $clr-secondary;
                border-right: 50px solid transparent;
                right: 0px;
                bottom: 0px;
                transform: translateY(-.05em) translateX(2.5em) rotate(15deg);
                position: absolute;
            }
        }
    }
</style>