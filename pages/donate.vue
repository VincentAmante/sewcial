<script setup lang="ts">
// Import of a speechbubble
import SpeechBubble from '@/components/SpeechBubble.vue'
import TiltedHeading from '@/components/TiltedHeading.vue'

</script>
<template>
  <main>
    <!-- Just test divs, don't mind -->
    <section class="flex flex-col items-center text-center text-secondary my-default-h gap-[4vw]">
      <div class="text-7xl flex flex-col items-center justify-center text-secondary font-bold pt-5 gap-0 tablet:flex-row tablet:gap-4">
        <span>Support</span>
        <TiltedHeading class="bg-accent-1">
          THE
        </TiltedHeading>
        <span>community</span>
      </div>
      <div class="flex flex-col tablet:flex-row gap-[6vw] mb-16">
        <div class="info-card flex flex-col items-center text-center">
          <img
            src="@/assets/icons/sharelove.png"
            alt=""
          >
          <h2 class="m-0">
            Share Love
          </h2>
          <p class="m-0 max-w-[12rem] text-black">
            Drop off your pre-loved clothes at one of our stores
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <img src="@/assets/icons/getrewards.png" alt="">
          <h2 class="m-0">
            Get Rewards
          </h2>
          <p class="m-0 max-w-[12rem] text-black">
            Receive a store credit voucher worth 10 AED
          </p>
        </div>
        <div class="flex flex-col items-center text-center">
          <img src="@/assets/icons/star.png" alt="">
          <h2 class="m-0">
            Make Anew
          </h2>
          <p class="m-0 max-w-[12rem] text-black">
            Up-cycle unique pieces from used clothing
          </p>
        </div>
      </div>
    </section>

    <section class="bg-secondary">
      <div class="text-white px-default-w py-default-h pb-20 leading-6 font-regular flex flex-col gap-2">
        <div>
          <h1>WHAT WE ACCEPT</h1>
          <p>
            We take in any pre-loved clothing for men, women and children, along
            with textiles.
          </p>
        </div>
        <div>
          <h1>HOW DO I PREPARE MY CONTRIBUTIONS?</h1>
          <ul class="list-disc pl-6">
            <li>Wash and fold your items.</li>
            <li>
              If you have end of life textiles that need recycling, it helps our
              sorting volunteers if you put these in a separate labeled bag.
            </li>
            <li>
              Include a note with any high value items or if contributing a luxury
              item (whether it is authentic or inauthentic).
            </li>
          </ul>
        </div>
        <div>
          <h1>WHAT HAPPENS TO YOUR ITEM?</h1>
          <p>
            First, we sort your items into:
          </p>
          <ol class="list-decimal pl-6">
            <li>
              Perfect quality - We bring them to the
              workshop to be up-cycled.
            </li>
            <li>
              Needs washing/stain treating/minor repairs -
              If the item is not perfect, but can be made to be perfect, we do our
              best. Volunteers take home stained items and individually treat these.
            </li>
            <li>
              Condition is unusable - Our partner, Kiswa, kindly buy these from us
              at AED2/kg and recycles them into furniture in Turkey.
            </li>
            <li>
              Luxury -
              regardless of the condition, we do our best to authenticate internally
              and repair.
            </li>
          </ol>
        </div>

        <img
          class="hidden absolute left-0 w-[8%] desktop:block lgScreen:w-[5%] xlScreen:[2%]"
          src="@/assets/images/donatesticker1.png"
        >
        <img
          class="hidden absolute right-0 w-[10%] desktop:block lgScreen:w-[7%] xlScreen:[4%]"
          src="@/assets/images/donatesticker2.png"
        >
      </div>
    </section>
    <section>
      <div class="flex flex-col items-center justify-center px-default-w pb-20 gap-8 tablet:flex-row mt-16">
        <div class="max-w-lg my-8">
          <img src="@/assets/images/donatemap.png" alt="">
        </div>
        <div class="mx-4">
          <div class="bubble">
            <SpeechBubble>
              <div class="py-4">
                DROP YOUR ITEMS HERE!
              </div>
            </SpeechBubble>
          </div>
          <SpeechBubble
            alignment="right"
            class="py-4"
          >
            <div class="text-alt font-medium">
              <span class="uppercase">Location</span> <br>
              Office No. 3002, Al Manara Tower <br>
              Dubai Marina <br>
              Dubai, UAE
            </div>
          </SpeechBubble>
        </div>
      </div>
    </section>
  </main>
</template>
