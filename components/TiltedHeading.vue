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
<template lang="">
    <p class="text-h-tilted tilted-text" :class="alignment">
        <slot></slot>
    </p>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .tilted-text {
        border-radius: 5px;
        padding-block: 5px;
        padding-inline: 10px;
        color: $clr-primary;
        width: fit-content;
        position: relative;
        max-width: 50ch;
        word-wrap: break-word;
        rotate: -5deg;
        &.left {
            align-self: flex-start;
            background-color: $clr-accent-1;
        }
    }
</style>