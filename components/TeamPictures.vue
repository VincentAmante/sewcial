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
    <div>
      <div class="text-primary font-medium" :class="alignment">
        <p><slot name="name" /></p>
      </div>

      <div class="text-accent-2">
        <p><slot name="role" /></p>
      </div>
    </div>
  </div>
<!-- </div> -->
</template>
