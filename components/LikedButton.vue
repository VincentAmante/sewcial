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
    <div class="liked" :class="alignment">
        <p>LIKED!</p>
        <IconHeart class="icon"></IconHeart>
    </div>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .liked {
        border-radius: 20px;
        color: $clr-primary;
        background-color: $clr-accent-2;
        margin: 5px;
        padding: .35em;
        padding-inline: 1.75em;
        width: 80%; //adjusts according to the size of container
        position: relative;

        display: flex;
        flex-direction: row;

        align-self: flex-start;
        justify-content: center;
        
        max-width: 40ch; //remove if not wide enough, was added for tests

        .icon {
            justify-self: center;
            align-self: center;
            margin-inline: 1vw;
        }

    }
</style>