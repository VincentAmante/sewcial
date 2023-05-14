<!-- TODO: Apply advanced behaviour -->
<script setup lang="ts">

</script>

<!--
    $emit('close-btn-clicked') creates an event that can be used to execute code
    see '../DescriptionSlider.vue for an implementation of the 'close-btn-clicked' emit
-->
<template>
  <AppIcon
    class="close-button"
    :icon="['fas', 'xmark']"
    @click="$emit('close-btn-clicked')"
  />
</template>

<style scoped lang="scss">
    .close-button {
        transition: all ease-out .15s;
        color: $clr-secondary;
        font-size: 45px;
        cursor: pointer;

        &:hover {
            opacity: .9;
        }
    }
</style>
