<script setup lang = "ts">
    import TiltedHeading from '@/components/TiltedHeading.vue';
</script>

<template>
    <main>
        <!-- Left sticker -->
        <img class="elements-left" src="@/assets/images/Sticker_1.png" width="190" height="250" alt="">

        <!-- Page Heading -->
        <div class="heading-container">
            <div class="page-heading">
                <TiltedHeading>
                    your liked
                </TiltedHeading>
                <h1 class="text-h-big-boy main-heading">Products</h1>
            </div>
        </div>

        <!-- Right sticker -->
        <img class="elements-right" src="@/assets/images/Sticker_2.png" width="150" height="175" alt="">

        <!-- Browse section -->
        <section class="products">
            <h2>BROWSE</h2>
            <div class="product-cards">
                
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
// Heading
.heading-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    padding-block: 5em;

    .main-heading{
        text-transform: capitalize;
        color: $clr-secondary;
        position: relative;
        margin: -20px 0 0 15px;

        @include media(tablet) {
            margin: -30px 0 0 50px;
        }
    }
}

// Stickers
.elements-left {
    position: absolute;
    right: 90%;
    top: 13%;
}

.elements-right {
    position: absolute;
    right: -5%;
    top: 18%; 
}
.products{
    display: flex;
    background-color: $clr-accent-1;
    padding: 3em;

    h2{
        color: $clr-primary;
    }
}
.product-cards{
    display: flex;
    overflow-x: scroll;
}
.product-cards::-webkit-scrollbar {
  display: none;
}

</style>