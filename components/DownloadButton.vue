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
        border-radius: 10px;
        color: $clr-primary;
        background-color: $clr-secondary;
        padding-inline: auto;
        width: 100%; //adjusts according to the size of container
        position: relative;

        display: flex;
        flex-direction: row;

        align-self: flex-start;
        justify-content: center;
        
        max-width: 100%; //remove if not wide enough, was added for tests

        .icon {
            justify-self: center;
            align-self: center;
            margin-inline: 1vw;
        }

    }
</style>