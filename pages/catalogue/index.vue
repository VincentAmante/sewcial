<script setup lang="ts">
import AppCatalogue from '~/components/Subpages/AppCatalogue.vue'

useHead({
  title: 'Sewcial | Catalogue'
})

definePageMeta({
  layout: 'shop'
})
</script>

<template>
  <main class="flex flex-col">
    <section class="grid mobile:grid-cols-2 border-b-secondary items-center justify-center border-dashed border-b-[4px] mobile:flex-row  min-h-[30rem] h-full">
      <img
        class="w-full h-full object-cover object-center"
        src="@/assets/images/collection.jpg"
      >
      <div class="flex flex-col items-center justify-center w-full h-full mb-8 min-h-[30vh] text-secondary tablet:items-start p-4 tablet:px-20">
        <div class="text-left p-2 max-w-md">
          <TiltedHeading class="bg-accent-1 translate-y-[60%] -z-10">
            NEW
          </TiltedHeading>
          <h1 class="text-h-giant capitalize">
            Collection
          </h1>
          <h2>Nike Blooms</h2>
          <p>
            Celebrate the season with our unique and eco-friendly upcycled clothing pieces, featuring vibrant floral patterns and sustainable materials.
          </p>
        </div>
        <SpeechBubble
          alignment="start"
          class="speech mx-auto tablet:mx-2 cursor-pointer transform translate-x-2"
          @click="() => useRouter().push('/catalogue/4735d118-a819-4a7d-ab82-919f5bf0ddba')"
        >
          <p class="button p-2 px-4 ">
            VIEW LIMITED EDITION
          </p>
        </SpeechBubble>
      </div>
      <img
        class="hidden absolute right-0 w-[15%] lgScreen:block"
        src="@/assets/images/cataloguestickers.png"
      >
    </section>
    <div class="min-h-[30rem]">
      <Suspense>
        <AppCatalogue />
        <template #fallback>
          <div class="h-full text-secondary text-h2 flex flex-col items-center py-6">
            Loading..
            <AppIcon :icon="['fas', 'spinner']" class="animate-spin" />
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>
