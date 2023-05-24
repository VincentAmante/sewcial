<script setup lang="ts">
// Variables passed to this component are props
defineProps({
  alignment: {
    type: String,
    default: 'center'
  },

  imgSrc: {
    type: String,
    required: true
  }
})
</script>

<!-- Team Member Card -->
<template>
  <!-- <div class="team-container"> -->
  <div class="text-center m-2 transition-all hover:transform hover:scale-110 cursor-pointer">
    <div>
      <img
        class="w-full"
        :src="imgSrc"
      >
    </div>
    <div class="my-4">
      <div class="text-accent-2 font-bold" :class="alignment">
        <p class="my-0">
          <slot name="name" />
        </p>
      </div>

      <p class="text-primary flex flex-col my-0 leading-tight">
        <slot name="role" />
      </p>
    </div>
  </div>
<!-- </div> -->
</template>
