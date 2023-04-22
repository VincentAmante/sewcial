<script setup lang="ts">
</script>

<!-- Template with default text and icon -->
<template lang="">
    <div class="download" :class="alignment">
        <p style="font-weight: 500">RSVP</p>
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
        display: flex;
        flex-direction: row;

        align-self: flex-start;
        justify-content: center;
        
        .icon {
            justify-self: center;
            align-self: center;
            margin-inline: 1vw;
        }

    }
</style>