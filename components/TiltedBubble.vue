<script setup lang="ts">
</script>

<template lang="">
  <SpeechBubbleRaw
    class="rotate-[-6deg] speech-bubble rounded-3xl text-primary m-1 px-7 w-fit relative max-w-[50ch] break-words self-start bg-accent-1"
    :class="alignment"
  >
    <slot name="icon" />
    <span class="text-6xl font-bold mx-1">
      <slot class="text" />
    </span>
    <div class="arrow" />
  </SpeechBubbleRaw>
</template>

<!-- Scoped Styling -->
<style scoped lang="scss">
    .big-text {
        font-size: clamp(47px, 6vmax, 130px);
    }
</style>
