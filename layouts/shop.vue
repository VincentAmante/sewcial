<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const { user, isUserSet, initialise } = useUserStore()

onMounted(async () => {
  if (!isUserSet && useAuth().status.value === 'authenticated') {
    let email = useAuth().data.value?.user?.email
    email = 'icenamante67@gmail.com'
    const { data, pending, error, refresh } = await useFetch(`/api/User/${email}`, {
      onResponse ({ response }) {
        const data = response._data
        initialise('name', data.email, data.id)
      }
    })
    refresh()
  }
})
// const email = useAuth().data.value?.user?.email
</script>

<template>
  <div>
    <TheHeader format="shop" />
    <NuxtPage />
  </div>
</template>
