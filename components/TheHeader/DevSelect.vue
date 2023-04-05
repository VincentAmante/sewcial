<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()

const selectedRoute = computed({
  get () {
    return router.currentRoute.value
  },
  set (value) {
    router.push(value)
  }
})
</script>

<template>
  <select
    id=""
    v-model="selectedRoute"
    name=""
    class="w-full h-10 rounded-md bg-primary outline-none"
  >
    <option v-for="route in routes" :value="route.path">
      <h3>{{ route.name }}</h3>
    </option>
  </select>
</template>

<script lang="scss">
</script>
