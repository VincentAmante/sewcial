<script setup lang="ts">
const email = useAuth().data.value?.user?.email
const { data, pending, error, refresh } = useFetch(`/api/User/${email}`)
</script>

<template>
  <div>
    <div>
      {{ data }}
    </div>
    <TheHeader format="shop" />
    <NuxtPage />
  </div>
</template>
