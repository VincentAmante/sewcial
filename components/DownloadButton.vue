<script setup lang="ts">
    // Import heart
    import IconHeart from '@/components/icons/IconHeart.vue';

    // Variables passed to this component are props
    const props = defineProps({
        alignment: {
            type: String,
            required: true,
            default: 'left'
        }
    })
</script>

<!-- Template with default text and icon -->
<template lang="">
    <div class="download" :class="alignment">
        <p style="font-weight: 500">DOWNLOAD</p>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .download {
        border-radius: 5px;
        color: $clr-primary;
        background-color: $clr-secondary;
        width: fit-content; //adjusts according to the size of container
        position: relative;
        padding-inline: 30px;
        padding-block: 0.005em;

        @include media(desktop) {
            padding-inline: 70px;
        }
        .icon {
            justify-self: center;
            align-self: center;
            margin-inline: 1vw;
        }

    }
</style>