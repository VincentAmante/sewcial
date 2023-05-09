<script setup lang="ts">
import SignInForm from '@/components/SignIn/SignInForm.vue'

// This creates an app-wide event to toggle the description slider
function toggleTestSlider (name: string) {
  window.dispatchEvent(new Event(`toggle-${name}`))
}

</script>
<template>
  <main class="flex flex-col items-center justify-center gap-4">
    <div class="max-w-full flex flex-col items-center justify-center">
      <!-- <AppButton @click="() => toggleTestSlider('cafe')">
        Sewcial Cafe
      </AppButton>
      <AppButton @click="() => toggleTestSlider('studio')">
        Sewcial Studio
      </AppButton>
      <AppButton @click="() => toggleTestSlider('workshop')">
        Sewcial Workshop
      </AppButton>
      <AppButton @click="() => toggleTestSlider('lounge')">
        Sewcial Lounge
      </AppButton>

      <AppButton @click="() => sampleError()">
        Throw error
      </AppButton>

      <AppButton @click="() => createCategoryTag()">
        Make CategoryTag
      </AppButton> -->
      <SignInForm />

      <LikeButton />

      <DescriptionSlider name="cafe" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Cafe
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="studio" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Studio
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
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

      <DescriptionSlider name="workshop" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Showcase
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
          <div class="flex flex-col">
            <SpeechBubble
              class="flex justify-between items-center cursor-pointer"
              @click="() => useRouter().push('/shop/catalogue')"
            >
              <p class="text-alt uppercase">
                See our Catalogue
              </p>
              <img src="/images/door.png" alt="">
            </SpeechBubble>
          </div>
        </template>
      </DescriptionSlider>

      <DescriptionSlider name="lounge" img-src="/images/placeholders/studio.png">
        <template #title>
          Sewcial Lounge
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
        </template>
      </DescriptionSlider>
    </div>
  </main>
</template>
