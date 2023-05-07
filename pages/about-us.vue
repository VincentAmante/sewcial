<script setup lang="ts">

</script>

<template>
  <main class="relative overflow-x-hidden">
    <!-- Stickers -->
    <div class="sticker-container absolute w-full ">
      <img class="sticker sticker-1 hidden desktop:block absolute -z-10 right-0 top-0 transform translate-x-[20%] translate-y-[-3%] w-[32rem]" src="@/assets/images/Sticker_7.png" alt="">
    </div>

    <div class="about-container">
      <div class="splash-greeting flex flex-col items-center gap-2 p-4 py-16 desktop:p-20">
        <h1 class="text-h-giant m-0 text-secondary lowercase">
          hello my
        </h1>
        <SpeechBubble alignment="right" colour-override="accent-1" class="transform -rotate-6 -translate-x-3 self-center flex flex-col gap-2 py-0">
          <h1 class="text-h-giant uppercase">
            cute cute
          </h1>
        </SpeechBubble>
        <h1 class="text-h-giant text-secondary lowercase">
          sewdents
        </h1>
      </div>

      <section class="about-info">
        <img src="../assets/images/third-place.png" alt="about us">
        <div class="about-wrapper">
          <div class="heading">
            <div class="flex">
              <h1 class="text-h-big-boy p-0">
                <span class="text-accent-1">A</span> <span class="text-primary lowercase">third place</span>
              </h1>
            </div>
            <div class="flex gap-4 items-center">
              <TiltedHeading class="and bg-primary text-accent-1 p-0 px-4 flex items-center transform translate-y-3">
                and
              </TiltedHeading>
              <h1 class="text-h-big-boy p-0 ">
                <span class="flex text-h-big-boy text-primary lowercase">
                  creative space
                </span>
              </h1>
              <!-- <h1 class="text-h-big-boy pink-h-small" /> -->
            </div>
          </div>

          <div class="para">
            <p>
              Lorem ipsum dolor sit amet consectetur. At purus maecenas nunc egestas sed. Tempor adipiscing venenatis praesent nisi tincidunt.
              Orci enim tristique aenean eu ac. Vel vestibulum imperdiet scelerisque dignissim in sagittis non dolor senectus.
              Sapien sodales tortor elementum suspendisse non mauris scelerisque. <br><br>
              Aliquam at pulvinar ipsum fringilla fermentum. Pulvinar enim scelerisque cras semper ac tortor. Scelerisque elit id risus mattis nibh lectus.
              Arcu turpis viverra cras fusce sit commodo porttitor. <br><br>
              Mattis pellentesque sed nunc dictum arcu mauris at. Nunc tortor mi non facilisis. Blandit risus mi sed tincidunt. Egestas nec est nisl laoreet
              lobortis arcu quis purus egestas. Dictum amet facilisis sed neque tortor.<br>
              Vestibulum tempor faucibus laoreet massa neque enim velit maecenas. Lorem vulputate enim neque in ac volutpat pharetra. Nulla consequat varius et leo sit. <br><br>
              Augue ut et faucibus donec. Sed hac elementum nunc hendrerit egestas tellus et rhoncus luctus. Lorem vitae diam purus quis in est pharetra enim.
            </p>
          </div>
        </div>
      </section>

      <section class="team-container">
        <div class="team-heading">
          <h1 class="text-h-big-boy cream-h">
            Meet
          </h1>
          <TiltedHeading class="bg-secondary text-accent-1 py-0 px-4 rounded-lg uppercase the">
            The
          </TiltedHeading>
          <h1 class="text-h-big-boy cream-h">
            Team!
          </h1>
        </div>
        <div class="team-members">
          <div class="one">
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
          <div class="two">
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
          <div class="three">
            <TeamPictures img-src="/images/team-icons/nella.png">
              <template #name>
                Nella Bermudo
              </template>
              <template #role>
                Role
              </template>
            </TeamPictures>
            <TeamPictures img-src="/images/team-icons/bie.png">
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

      <section class="banner">
        <div class="wrapper-1">
          <div class="container">
            <img src="../assets/images/about-1.png" alt="about us">
            <div class="card light">
              <h1>“motherr”</h1>
            </div>
          </div>
          <div class="container">
            <div class="card dark">
              <h1>“fav hangout spot 4evs”</h1>
            </div>
            <img src="../assets/images/about-3.png" alt="about us">
          </div>
        </div>
        <div class="wrapper-2">
          <div class="container">
            <img src="../assets/images/about-2.png" alt="about us">
            <div class="card dark">
              <h1>“grape”</h1>
            </div>
          </div>
          <div class="container">
            <div class="card light">
              <h1>“so slay halal queen”</h1>
            </div>
            <img src="../assets/images/about-4.png" alt="about us">
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.about-container{
    .splash-greeting{
        h1{
        margin: 0;
            text-transform: lowercase;
        }
    }
}
.about-info{
    background-color: $clr-secondary;
    outline: 4px dashed $clr-secondary;
    display: flex;
    flex-direction: column-reverse;

    @include media(desktop){
        flex-direction: row;
        align-items: center;
        // align-items: stretch;
    }

    img{
        padding: 0 2em 2em 2em;
        width: 100%;
        @include media(desktop){
            padding: 5em 0 5em 0;
            width: 50%;
            position: relative;
            transform: translateX(-20%);
        }
    }

    .about-wrapper{
        padding: 2em 2em 0 2em;
        @include media(desktop){
            padding: 5em 5em 5em 0;
        }
    }
    .heading{
        display: flex;
        flex-direction: column;
    }
    .pink-h-small{
        color: $clr-accent-1;
        text-transform: lowercase;
    }
    .and{
        background-color: $clr-primary;
        color: $clr-accent-1;
    }
    .para{
        color: $clr-primary;
        line-height: 1.2em;
    }
}
.team-container{
    background-color: $clr-accent-1;
    outline: 4px dashed $clr-accent-1;
    margin-top: -1px;
    position: relative;
    z-index: 100;
    padding: 2em;
    @include media(desktop){
        padding: 5em;
    }
    .team-heading{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding-bottom: 2em;
    }
    .cream-h{
        color: $clr-primary;
        text-transform: capitalize;
    }
    .the{
        background-color: $clr-secondary;
        color: $clr-accent-1;
    }
    .team-members{
        display: flex;
        flex-direction: column;
        align-items: center;
        @include media(desktop){
            flex-direction: row;
            justify-content: space-evenly;
            padding-inline: 3em;
        }
    }
    .one, .two, .three{
        display: flex;
        flex-direction: row;
        gap: 20px;
        @include media(desktop){
            gap: 0;
        }
    }
}

.banner{
    padding: 2em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    h1{
      font-size: 50px;
    }

    @include media(tablet){
        .wrapper-1, .wrapper-2{
            width: 50%;
        }
        padding: 5em;
        flex-direction: row;
        align-items: stretch;
    }
    .container{
        display: flex;
        align-items: stretch;
        img{
            width: 50%;
            height: auto;
        }
        .card{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        }
    }

    .light{
        background-color: $clr-primary;
        outline: 1px $clr-secondary solid;
        h1{
            color: $clr-secondary;
            text-transform: lowercase;
            text-align: center;
            padding: 0.5em;
        }
    }
    .dark{
        background-color: $clr-accent-2;
        outline: 1px $clr-secondary solid;
        h1{
            color: $clr-primary;
            text-shadow:
            -1px -1px 0 $clr-secondary,
            1px -1px 0 $clr-secondary,
            -1px  1px 0 $clr-secondary,
            1px  1px 0 $clr-secondary;
            text-transform: lowercase;
            text-align: center;
            padding: 0.5em;
        }
    }
}

</style>
