<script setup lang="ts">
// Import of a speechbubble
import SpeechBubble from '@/components/SpeechBubble.vue'
import TiltedHeading from '@/components/TiltedHeading.vue'
</script>
<template>
  <main>
    <!-- Just test divs, don't mind -->
    <section>
      <div class="splash-headings">
        <span>Support</span>
        <TiltedHeading class="the">
          THE
        </TiltedHeading>
        <span>community</span>
      </div>
      <div class="card-section">
        <div class="info-card">
          <img src="@/assets/icons/sharelove.png" alt="">
          <h2>Share Love</h2>
          <p>Drop off your pre-loved clothes at one of our stores</p>
        </div>
        <div class="info-card">
          <img src="@/assets/icons/getrewards.png" alt="">
          <h2>Get Rewards</h2>
          <p>Receive a store credit voucher worth 10 AED</p>
        </div>
        <div class="info-card">
          <img src="@/assets/icons/star.png" alt="">
          <h2>Lorem Ipsum</h2>
          <p>Up-cycle unique pieces from unused clothing</p>
        </div>
      </div>
    </section>

    <section class="donate">
      <div class="donate-info">
        <div>
          <h2>WHAT WE ACCEPT</h2>
          <p>
            We take in any pre-loved clothing for men, women and children, along
            with textiles.
          </p>
        </div>
        <div>
          <h2>HOW DO I PREPARE MY CONTRIBUTIONS?</h2>
          <ul>
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
          <h2>WHAT HAPPENS TO YOUR ITEM?</h2>
          <p>
            First, we sort your items into:
          </p>
          <ol>
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
              at AED2/kg and recycles them into furniture in Turkey. Luxury -
              regardless of the condition, we do our best to authenticate internally
              and repair.
            </li>
          </ol>
        </div>
      </div>
    </section>
    <section>
      <div class="location-info">
        <div class="map">
          <img src="@/assets/images/donatemap.png" alt="">
        </div>
        <div class="location">
          <div class="bubble">
            <SpeechBubble>
              <div class="pink-bubble">
                DROP YOUR ITEMS HERE!
              </div>
            </SpeechBubble>
          </div>
          <SpeechBubble alignment="right">
            <div class="blue-bubble">
              LOCATION <br>
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
<style scoped lang="scss">
.splash-headings {
    font-size: 4.5em;
    display: flex;
    color: $clr-secondary;
    font-weight: bold;
    // background-color: aqua;
    justify-content: center;
    // align-content: center;
    padding-top: 1.15em;
}

.the {
    // color: $clr-primary;
    font-size: 40px;
    // background-color: $clr-accent-1;
    // height: min-content;
    padding-block: 1px;
    padding-inline: 15px;
    border-radius: 0.2em;
    rotate: -15deg;
    margin-inline: 20px;
    // transform: translateY(20px);
}

.card-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    column-gap: 9em;
    padding: 4em;
    h2 {
        // font-weight: bold;
        color: $clr-secondary;
        // text-transform: capitalize;
    }

}

.info-card {
    // background-color: aqua;
    width: 12em;
    // margin-inline: 40px;
    img{
        width: 11em;
    }
}

.donate {
    background-color: $clr-secondary;
}

.donate-info {
    color: white;
    padding: 100px;
    padding-inline: 250px;

    div {
        padding-bottom: 50px;
    }
}

.pink-bubble{
    padding: 1em;

    font-weight: 500;
}

.blue-bubble{
    padding: 1em;
    font-weight: 500;
}

.bubble{
    padding-bottom: 2rem;
}

.map img{
    width: 37rem;
}

.location{
    width: 500px;
}

.location-info{
    display: flex;
    justify-content: center;
    padding: 10em;
    gap: 5em;
    border-top: 4px dashed $clr-secondary;
}
</style>
