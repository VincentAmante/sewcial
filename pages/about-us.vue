<script setup lang="ts">

</script>

<template>
  <main>
    <!-- Stickers -->
    <div class="sticker-container">
        <img class="sticker sticker-1" src="@/assets/images/Sticker_7.png" alt="">
    </div>

    <div class="about-container">
      <div class="splash-greeting">
        <h1 class="text-h-giant blue-h">
          hello my
        </h1>
        <SpeechBubble alignment="right" class="tilted-splash-heading">
          <h1 class="text-h-giant">
            cute cute
          </h1>      
        </SpeechBubble>
        <h1 class="text-h-giant blue-h">
          sewdents
        </h1>
      </div>

      <section class="about-info">
        <img src="../assets/images/third-place.png" alt="about us">
        <div class="about-wrapper">
          <div class="heading">
            <div class="part-1">
              <h1 class="text-h-big-boy pink-h">
                A
              </h1>
              <h1 class="text-h-big-boy cream-h">
                third place
              </h1>
            </div>
            <div class="part-2">
              <TiltedHeading class="and">
                <h1>and</h1>
              </TiltedHeading>
              <h1 class="text-h-big-boy pink-h-small">
                creative space
              </h1>
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
          <TiltedHeading class="the">
            <h1>THE</h1>
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
main{
    position: relative;
    overflow-x: hidden;
}
.sticker-container {
    position: absolute;
    width: 100%;

    // Sets stickers to display only past desktop
    .sticker {
        display: none;
        @include media(desktop){
            display: block;
        }
    }

    .sticker-1 {
        position: absolute;
        z-index: -10;
        right: 0;
        top: 0;
        transform: translateX(20%) translateY(-3%);
        width: 32em;
    }
}
.about-container{
    .text-h-giant{
        margin: 0;
    }
    .splash-greeting{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5em;
        padding: 2em;
        h1{
            text-transform: lowercase;
        }
        .blue-h{
            color: $clr-secondary;
        }
        .tilted-splash-heading{
            border-radius: 20px;
            padding-block: 0;
            padding-inline: 1.2em;
            align-self: center;
            background-color: $clr-accent-1;
            rotate: -5deg;

            @include media (desktop) {
              // align-self: flex-start;
            }
        }
        @include media (desktop) {
          padding: 5em;
          // align-items: flex-start;
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
    .part-1{
        display: flex;
        gap: 20px;
    }
    .part-2{
        @extend .part-1;
        align-items: center;
        gap: 1.2em;
    }
    .pink-h{
        color: $clr-accent-1;
    }
    .cream-h{
        color: $clr-primary;
        text-transform: lowercase;
    }
    .pink-h-small{
        color: $clr-accent-1;
        text-transform: lowercase;
    }
    .and{
        background-color: $clr-primary;
        color: $clr-accent-1;
        padding-block: 0;
        padding-inline: 15px;
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
        padding-block: 0;
        padding-inline: 15px;
        border-radius: 10px;
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
