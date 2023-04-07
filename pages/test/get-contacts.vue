<!-- prisma.vue -->
<script setup lang="ts">
const { data: examples } = useFetch('/api/ContactSubmissions/')
</script>

<template>
  <div>
    Prisma ORM Data from the database, received {{ examples?.length || 0 }} records: <pre>{{ examples }}</pre>
  </div>
</template>
