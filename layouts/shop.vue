<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'

useServerSeoMeta({
  title: 'Sewcial | Catalogue',
  referrer: 'no-referrer',
  ogUrl: 'https://sewcial.space',
  ogTitle: 'Sewcial',
  description: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡',
  ogDescription: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡',
  ogType: 'website',
  ogImage: 'https://sewcial.space/images/thumbnail.png',
  ogImageAlt: 'A picture of the Sewcial store',
  twitterImage: 'https://sewcial.space/images/thumbnail.png',
  themeColor: '#FF96C3',
  twitterTitle: 'Sewcial | Catalogue',
  twitterCard: 'summary_large_image'
})

const { isUserSet, initialise, updateLikedItems, user } = useUserStore()
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

const { refresh: refreshLikedCount } = useFetch('/api/CatalogueItems/getLikedIds', {
  method: 'POST',
  body: JSON.stringify({
    userId: user.id
  }),
  onResponse ({ response: likedItems }) {
    updateLikedItems(likedItems._data.length)
  }
})
refreshLikedCount()

function attemptLogIn () {
  if (!isUserSet && !(useAuth().status.value === 'authenticated')) {
    signInToggled.value = true
  } else {
    useRouter().push('/catalogue/liked')
  }
}

const signInToggled = ref(false)
</script>

<template>
  <div class="max-w-[1920px] mx-auto relative">
    <div
      v-if="(!isUserSet && !(useAuth().status.value === 'authenticated')) && signInToggled"
      class="fixed p-20 flex flex-col items-center justify-center z-[200] h-full w-full bg-dark bg-opacity-50"
    >
      <SignInForm
        class="max-w-lg w-full"
        redirect-to="/catalogue/liked"
        @close="signInToggled = false"
      />
    </div>
    <TheHeader
      format="shop"
      @clicked-liked-btn="attemptLogIn"
    />
    <NuxtPage @clicked-liked-btn="attemptLogIn" />
    <Footer />
  </div>
</template>
