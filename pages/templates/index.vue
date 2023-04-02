<script setup lang="ts">
import TiltedHeading from '@/components/TiltedHeading.vue';
import TemplateCard from '@/components/TemplateCard.vue';
import IconFilterVue from '@/components/icons/IconFilter.vue';
import TemplateHoverCard from '@/components/TemplateHoverCard.vue';
</script>

<template>
    <main>
        <!--Stickers-->
        <div class="sticker-container">
            <img class="sticker sticker-2" src="@/assets/images/Sticker_1.png" alt="">
            <img class="sticker sticker-1" src="@/assets/images/Sticker_2.png" alt="">
        </div>
        <!-- Page Heading -->
        <div class="heading-container">
            <div class="title">
                <TiltedHeading>COMMUNITY</TiltedHeading>
                <h1 class="templates-heading">Templates</h1>
            </div>
            <p class="text">Lorem ipsum dolor sit amet consectetur. At purus maecenas nunc egestas sed. Tempor adipiscing venenatis praesent nisi tincidunt. Orci enim tristique aenean eu ac. Vel vestibulum imperdiet scelerisque dignissim in sagittis non dolor senectus. Sapien sodales tortor elementum suspendisse non mauris scelerisque. </p>
        </div>

        <!-- Right sticker -->
        <!-- <img class="img-2" src="@/assets/images/Sticker_2.png" width="150" height="175" alt=""> -->

        <!-- Featured section -->
        <section class="featured">
            <h2>Featured</h2>
            <div class="featured-cards">
                <TemplateCard :image="'https://i.pinimg.com/564x/c7/b1/a9/c7b1a9ac00520fa67049d6be289d3d7a.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/originals/b0/64/9b/b0649b47f772eff32155388dde42f478.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/61/e2/b6/61e2b6c4b5f15d5c4479dbe98dffa9d6.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/ca/ae/28/caae28b35eac866340236e8026720097.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/5a/b3/0d/5ab30dc56c00c6574c0b88b7d6c6e6bb.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/50/04/41/500441ed889a4ed4ce976d4cad96e0ca.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/0a/e9/b3/0ae9b312039833d3020b595bbb01925f.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
                <TemplateCard :image="'https://i.pinimg.com/564x/c5/e3/00/c5e3007fb19097f6485d945dc212bffa.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                </TemplateCard>
            </div>
        </section>

        <!-- Browse section -->
        <section class="browse">
            <h2>Browse</h2>
            <div class="filter">
                <p>400 ITEMS</p>
                <div class="filter-options">
                    <IconFilterVue />
                    <p>Filter</p>
                    <!-- <select name="filter" id="filter">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="most-liked">Most Liked</option>
                        <option value="least-liked">Least Liked</option>
                    </select> -->
                </div>
            </div>
            <TemplateHoverCard :image="'https://i.pinimg.com/originals/81/fb/e1/81fbe1c31719a0bd6258fec7a34ad20c.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
            </TemplateHoverCard>
            <TemplateHoverCard :image="'https://i.pinimg.com/564x/e4/63/98/e46398c55b4125f51c33b3742c5a6aa0.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
            </TemplateHoverCard>
            <TemplateHoverCard :image="'https://i.pinimg.com/564x/03/14/5e/03145e4cc2f8a95f3bbe0028be946d91.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
            </TemplateHoverCard>
            <TemplateHoverCard :image="'https://i.pinimg.com/564x/0e/41/77/0e4177d885f21bc6c9e77f7408ecb3cf.jpg'">
                <template #text>
                    <h1>ITEM NAME</h1>
                    <h3>OWNER'S NAME</h3>
                </template>
            </TemplateHoverCard>
        </section>
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
        z-index: -5;
        right: 0;
        top: 0;
        transform: translateX(30%) translateY(20%);

        width: 12em;
    }
    .sticker-2 {
        position: absolute;
        z-index: -5;
        top: 0;
        left: 0;
        transform: translateX(-30%) translateY(10%);

        width: 12em;
    }
}
.browse{
    background-color: $clr-secondary;
    padding: 3em;
    outline: 5px dashed $clr-secondary;

    h2, p{
        color: $clr-primary;
    }

    @include media(desktop) {
        padding: 5em;
    }
}
.filter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;

    .filter-options{
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
        text-transform: uppercase;
    }
}
.featured{
    background-color: $clr-accent-1;
    padding: 3em;

    h2{
        color: $clr-primary;
    }
    
    .featured-cards{
    display: flex;
    overflow-x: scroll;
    }
    .featured-cards::-webkit-scrollbar {
    display: none;
    }

    @include media(desktop) {
        padding: 5em;
    }
}

.heading-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 3em;
    padding-inline: $margin-width;

    @include media(tablet) {
        flex-direction: row;
        justify-content: space-between;
        padding-block: 5em;
        column-gap: 5em;
    }
    @include media(desktop) {
        flex-direction: row;
        justify-content: space-between;
        padding-block: 5em;
        column-gap: 15em;
    }
}
.templates-heading{
    text-transform: capitalize;
    color: $clr-secondary;
    position: relative;
    font-size: 30px;
    margin: -20px 0 0 15px;


    @include media(tablet) {
        font-size: 50px;
        margin: -25px 0 0 50px;
    }
}
.title {
    padding-bottom: 1.5em;
}
.text{
    // width: 525px;
    line-height: 1.4em;
    color: $clr-text;
}

</style>