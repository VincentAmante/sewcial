<template>
  <div class="bg-primary">
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
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

      <DescriptionSlider
        class="z-[150]"
        name="shop"
        img-src="/images/scenes/shop.png"
      >
        <template #title>
          Sewcial Showcase
        </template>
        <template #default>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, totam officia. Repellendus consectetur pariatur ex repudiandae dignissimos ducimus, consequuntur laboriosam! Corporis porro sunt ipsa harum nulla quod rerum voluptatum sint.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod et ad illum, vero debitis dignissimos totam minima eligendi eveniet quisquam?</p>
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
</template>
