<script setup lang="ts">
</script>

<template lang="">
    <div class="speech-bubble" :class="alignment">
        <slot name="icon"></slot>
        <p class = "big-text">
            <slot class="text"></slot>
        </p>
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
        align-self: flex-start;
        background-color: $clr-accent-1;

        rotate: -5deg;

        .big-text {
            font-size: clamp(47px, 6vmax, 130px);
            font-weight: 700;
            margin-block: 5px;
            margin-inline: 0.2em;
        }

            .arrow {
                z-index: -1;
                width: 0; 
                height: 0; 
                border-bottom: 20px solid $clr-accent-1;
                border-right: 50px solid transparent;
                right: 0px;
                bottom: 0px;
                transform: translateY(-.05em) translateX(2.5em) rotate(15deg);
                position: absolute;
            }
        }
</style>