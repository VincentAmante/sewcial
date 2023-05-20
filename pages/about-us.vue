<script setup lang="ts">

useHead({
  title: 'Sewcial | About Us'
})

</script>

<template>
  <main class="relative overflow-x-hidden">
    <!-- Stickers -->
    <div class="sticker-container absolute w-full ">
      <img
        class="sticker sticker-1 hidden desktop:block absolute -z-10 right-0 top-2 transform translate-x-[20%] translate-y-[-3%] w-[40rem]"
        src="@/assets/images/Sticker_7.png"
        alt=""
      >
    </div>

    <div class="about-container">
      <div class="splash-greeting flex text-center flex-col gap-0 p-4 py-16 desktop:p-20 desktop:text-left desktop:translate-x-[8%] desktop:text">
        <h1 class="text-[100px] m-0 -mb-5 text-secondary lowercase">
          sew.
        </h1>
        <SpeechBubbleRaw alignment="left" colour-override="accent-1" class="transform -rotate-6 -translate-x-0 -translate-y-0 flex flex-col gap-2 py-0 -ml-2 my-0 scale-90 self-center mobile:px-8 desktop:self-start">
          <h1 class="text-[100px] w-full lowercase text-center transform my-0 py-0.05 px-2">
            share.
          </h1>
        </SpeechBubbleRaw>
        <h1 class="text-[100px] text-secondary lowercase -mt-2 -translate-y-4">
          connect.
        </h1>
      </div>

      <section
        class="about-info flex flex-col-reverse bg-secondary outline-4 outline-dashed outline-secondary
        desktop:flex-row desktop:items-center"
      >
        <img
          class="p-8 pt-0 mt-10 translate-x-[3%] desktop:px-0 desktop:py-20 desktop:w-2/5 relative transform desktop:translate-x-[-15%]"
          src="../assets/images/third-place2.png"
          alt="about us"
        >

        <img
          class="hidden absolute right-0 top-100 w-[15%] desktop:block lgScreen:w-[10%] xlScreen:[5%]"
          src="@/assets/images/aboutstickers.png"
        >
        <div class="about-wrapper p-8 pb-0 desktop:p-20 desktop:pl-0 py-16">
          <div class="heading flex flex-col my-8">
            <div class="flex">
              <h1 class="text-h-big-boy p-0  my-0">
                <span class="text-accent-1">A</span> <span class="text-primary lowercase">third place</span>
              </h1>
            </div>
            <div class="flex gap-4 items-center -mt-6">
              <TiltedHeading
                text-color="accent-1"
                class="and bg-primary p-0 px-4 flex items-center transform translate-y-3"
              >
                and
              </TiltedHeading>
              <h1 class="text-h-big-boy p-0 ">
                <span class="flex text-h-big-boy text-accent-1 lowercase">
                  creative space
                </span>
              </h1>
              <!-- <h1 class="text-h-big-boy pink-h-small" /> -->
            </div>
          </div>

          <div class="para text-primary leading-5 desktop:w-[70%] desktop:ml-20">
            <p>
              Welcome to Sewcial, your place to sew, share, and connect!
              We host a collection of spaces that provide a unique environment for youth to pursue their passions in sustainable fashion,
              earn from learning new skills, and build a community. Eat and study at the Sewcial Cafe;
              meet new people and participate in events at the Sewcial Lounge;
              learn how to sew, craft, and upcycle at the Sewcial Studio.
            </p>
            <p>
              We aim to be one of very few third places catered to young people in Dubai
              -
              somewhere outside home or school that one spends time in to interact with others.
              We do this by intentionally curating these spaces to serve them and their needs for community, creativity, and belonging.
            </p>
            <p>
              We hope to see you soon at Sewcial, where creativity provides community.
            </p>
          </div>
        </div>
      </section>

      <section class="team-container bg-accent-1 outline-4 outline-dashed outline-accent-1 relative z-[100] p-8 desktop:20">
        <div class="team-heading flex items-center justify-center gap-2 pb-8">
          <h1 class="text-h-big-boy text-primary capitalize">
            Meet
          </h1>
          <TiltedHeading class="bg-secondary text-accent-1 py-0 px-4 rounded-lg uppercase">
            The
          </TiltedHeading>
          <h1 class="text-h-big-boy text-primary capitalize">
            Team!
          </h1>
        </div>
        <div class="team-members flex flex-col items-center desktop:flex-row desktop:justify-evenly desktop:px-12">
          <div class="one flex flex-row gap-5 desktop:gap-0">
            <TeamPictures img-src="/images/team-icons/nehan.png">
              <template #name>
                Nehan Tariq
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
            <TeamPictures img-src="/images/team-icons/frnk.png">
              <template #name>
                Franchesca Raymundo
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
          </div>
          <div class="two flex flex-row gap-5 desktop:gap-0">
            <TeamPictures img-src="/images/team-icons/louis.png">
              <template #name>
                Anthony Cubillas
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
            <TeamPictures img-src="/images/team-icons/icen.png">
              <template #name>
                Vincent Amante
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
          </div>
          <div class="three flex flex-row gap-5 desktop:gap-0">
            <TeamPictures img-src="/images/team-icons/nella.png">
              <template #name>
                Nella Bermudo
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
            <TeamPictures
              img-src="/images/team-icons/bie.png"
            >
              <template #name>
                Princelle Abbie
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
          </div>
        </div>
      </section>

      <section class="p-8 desktop:p-20">
        <div class="grid grid-cols-1 gap-1">
          <div class="grid grid-cols-3 gap-1">
            <NuxtLink to="https://www.instagram.com/p/CsObqGCg0Z1/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-14.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CsN9V4fSxmD/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-13.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CsL8YxgAqn1/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/reel1.jpg"
              >
            </NuxtLink>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <NuxtLink to="https://www.instagram.com/p/CsJXpqvya7W/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-09.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CsGuojXM7PR/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-10.jpg"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CsBgZQVvLMr/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-11.png"
              >
            </NuxtLink>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <NuxtLink to="https://www.instagram.com/p/Cr8XLjjvnO7/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-07.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/Cr3XXHLPIdx/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-05.jpg"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CryIRACP4XI/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-03.png"
              >
            </NuxtLink>
          </div>
          <div class="grid grid-cols-3 gap-1">
            <NuxtLink to="https://www.instagram.com/p/Crs9UhhvjKs/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/may-01.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/Crn7xkWhHhU/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/april-29.png"
              >
            </NuxtLink>

            <NuxtLink to="https://www.instagram.com/p/CrimAKwBlYH/" class="aspect-square overflow-hidden">
              <img
                class="w-full hover:scale-105 transition-all duration-300 ease-in-out hover:brightness-90"
                src="../assets/images/april-27.png"
              >
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
    <LazyFooter />
  </main>
</template>
