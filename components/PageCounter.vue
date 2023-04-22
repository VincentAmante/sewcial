<script setup lang="ts">
defineProps({
  pageCount: {
    type: Number,
    default: 2
  },
  totalPages: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <ul class="flex justify-between relative list-none p-0 m-0">
    <li
      v-for="i in totalPages"
      :key="i"
      class="flex justify-center items-center px-1 z-50"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" :fill="(i <= pageCount) ? '#FFF' : '#607BDA'" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6.5" stroke="white" :stroke-width="2" />
      </svg>
    </li>
    <div class="line-container h-full w-full absolute flex items-center justify-center">
      <div class="line absolute h-1 w-9/12 z-40 bg-white" />
    </div>
  </ul>
</template>
