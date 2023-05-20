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
  themeColor: '#FF96C3',
  twitterTitle: 'Sewcial | Map',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="bg-secondary">
    <div>
      <DescriptionSlider
        class="z-[150]"
        name="lounge"
        img-src="/images/scenes/lounge.png"
      >
        <template #title>
          Sewcial Lounge
        </template>
        <template #default>
          <p>Our lounge areas outside for people to socialise in. On the rooftop, there is an extension of the café, lounge seating, and a small stage equipped for an open mic and other community events.</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider
        class="z-[150]"
        name="cafe"
        img-src="/images/scenes/cafe.png"
      >
        <template #title>
          Sewcial Cafe
        </template>
        <template #default>
          <p>The café areas inside and outside the building for people to enjoy hot drinks and food. We also give small part-time employment opportunities for youth to help with the café.</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider
        class="z-[150]"
        name="studio"
        img-src="/images/scenes/studio.png"
      >
        <template #title>
          Sewcial Studio
        </template>
        <template #default>
          <p>This workshop space provides clothes, fabric, and tools to create upcycled pieces. We also host regular interactive sessions for beginners, as well as weekly donation drives for people to donate used clothing (to be used for workshop sessions).</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/templates')"
            >
              <p class="text-alt uppercase">
                Try our templates
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
            <SpeechBubble
              alignment="right"
              class="flex flex-row-reverse justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/donate')"
            >
              <p class="text-alt uppercase">
                Donate Here
              </p>
              <img src="/images/door-alt.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>

      <div>
        <DescriptionSlider
          class="z-[150]"
          name="shop"
          img-src="/images/scenes/catalogue.png"
        >
          <template #title>
            Sewcial Showcase
          </template>
          <template #default>
            <p>A small shop where customers can showcase, buy, and even sell their own pieces they’ve created in the Sewcial Studio. We also sell our own merchandise, called the Sewcial Club. Stop by every once in a while to check for new unique pieces!</p>
            <div class="flex flex-col">
              <SpeechBubble
                class="flex justify-between items-center cursor-pointer text-center"
                @click="() => useRouter().push('/shop')"
              >
                <p class="text-alt uppercase">
                  See our Catalogue
                </p>
                <img src="/images/door.png" alt="">
              </SpeechBubble>
            </div>
          </template>
        </DescriptionSlider>
      </div>
      <TheHeader format="home" />
      <NuxtPage />
    </div>
  </div>
</template>
