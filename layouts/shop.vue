<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const user = useUserStore()
const userData = user.user

onMounted(async () => {
  if (!user.isSet) {
    const email = useAuth().data.value?.user?.email
    if (email === undefined) {
      return
    }

    const { data, pending, error, refresh } = await useFetch(`/api/User/${email}`, {
      onResponse ({ response }) {
        console.log(response._data)
        user.initialise(JSON.stringify({
          email: response._data.email,
          name: '',
          id: response._data.id
        }))
      }
    })
  }
})
// const email = useAuth().data.value?.user?.email
</script>

<template>
  <div>
    <div>
      {{ user }}
    </div>
    <TheHeader format="shop" />
    <NuxtPage />
  </div>
</template>
