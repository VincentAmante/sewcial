<script setup lang="ts">

useServerSeoMeta({
  referrer: 'no-referrer',
  ogUrl: 'https://sewcial.space',
  ogTitle: 'Sewcial',
  description: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡',
  ogDescription: 'Your new third place for creativity, sustainability, and community. Upcycle clothes, make friends and build a better future! 🌍🧵🪡',
  ogImage: 'https://sewcial.space/images/thumbnail.png',
  ogImageAlt: 'A picture of the Sewcial store',
  twitterImage: 'https://sewcial.space/images/thumbnail.png',
  themeColor: '#FF96C3'
})
</script>

<template>
  <div class="max-w-[1920px] mx-auto relative">
    <!-- {{ data }} -->
    <TheHeader />
    <NuxtPage />
  </div>
</template>
