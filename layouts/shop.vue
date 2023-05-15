<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

const { isUserSet, initialise } = useUserStore()
if (!isUserSet && useAuth().status.value === 'authenticated') {
  const email = useAuth().data.value?.user?.email
  const { refresh } = useFetch(`/api/User/${email}`, {
    onResponse ({ response }) {
      const data = response._data
      initialise('name', data.email, data.id)
    }
  })
  refresh()
}

function attemptLogIn () {
  if (!isUserSet && !(useAuth().status.value === 'authenticated')) {
    signInToggled.value = true
  } else {
    useRouter().push('/shop/liked')
  }
}

const signInToggled = ref(false)
</script>

<template>
  <div>
    <div
      v-if="(!isUserSet && !(useAuth().status.value === 'authenticated')) && signInToggled"
      class="fixed p-20 flex flex-col items-center justify-center z-[200] h-full w-full bg-dark bg-opacity-50"
    >
      <SignInForm
        class="max-w-lg w-full"
        redirect-to="/shop/liked"
        @close="signInToggled = false"
      />
    </div>
    <TheHeader
      format="shop"
      @clicked-liked-btn="attemptLogIn"
    />
    <NuxtPage />
  </div>
</template>
