<script setup lang="ts">
    // Import of a speechbubble
    import SpeechBubble from '@/components/SpeechBubble.vue';

    import ButtonDownload from '@/components/icons/ButtonDownload.vue';
    import ButtonFullscreen from '@/components/icons/ButtonFullscreen.vue';
    import ButtonLikedPage from '@/components/icons/ButtonLikedPage.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconCreditCard from '@/components/icons/IconCreditCard.vue';
    import IconFilter from '@/components/icons/IconFilter.vue';
    import IconPlus from '@/components/icons/IconPlus.vue';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconChevronLeft from '@/components/icons/IconChevronLeft.vue';
    import IconChevronRight from '@/components/icons/IconChevronRight.vue';

    import LikeMeButton from '@/components/LikeMeButton.vue';
    import LikedButton from '@/components/LikedButton.vue';
    import TemplateCard from '@/components/TemplateCard.vue';
    import DownloadButton from '@/components/DownloadButton.vue';
    import DropdownTab from '@/components/DropdownTab.vue';
    import CatalogueCard from '@/components/CatalogueCard.vue';
    import ItemDescription from '@/components/ItemDescription.vue';
    import BookingSummary from '@/components/BookingSummary.vue';
    import Pagination from '@/components/Pagination.vue';
</script>
<template>
    <main>
        <!-- Just test divs, don't mind -->
        <div class="test">
            <div class="test-wrapper">
                <ItemImage :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'">
                </ItemImage>

                <!-- A component with slots in action -->
                <SpeechBubble>
                <h2>FRANKIE</h2>
                <p>This bubble contains all the blue and cream icons created during my session!</p>
                <div>
                    <ButtonDownload class="icon"></ButtonDownload>
                    <ButtonFullscreen class="icon"></ButtonFullscreen>
                    <ButtonLikedPage class="icon"></ButtonLikedPage>
                    <IconHeart class="icon"></IconHeart>
                    <IconPlus class="icon"></IconPlus>
                    <IconCreditCard class="icon"></IconCreditCard>
                    <IconChevronLeft class="icon"></IconChevronLeft>
                    <IconChevronRight class="icon"></IconChevronRight>
                    <IconFilter class="icon"></IconFilter>
                </div>
                </SpeechBubble>
                <!-- Component with a prop, the one above uses a default -->
                <SpeechBubble alignment="right">
                <h2>FRANKIE</h2>
                <p>Some pink and cream icons from the same sessions :)</p>
                <div>
                    <IconUser class="icon"></IconUser>
                </div>
                </SpeechBubble>

                <SpeechBubble>
                <h2>FRANKIE</h2>
                <p>Below, there are some big boy assets, like cards and buttons.</p>
                <div>
                    
                </div>
                </SpeechBubble>
                <p>-------------------------------------------------</p>
                <LikeMeButton></LikeMeButton>
                <LikedButton></LikedButton>
                <DownloadButton></DownloadButton>
                <TemplateCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'">
                    <template #item-name>ITEM NAME</template>
                    <template #owner>OWNER</template>
                    <template #description>Short description</template>
                </TemplateCard>
                <DropdownTab>
                    <h1>SHOP BY</h1>
                </DropdownTab>
                <DropdownTab>
                    <h1>STYLE</h1>
                </DropdownTab>
                <DropdownTab>
                    <h1>PRICE</h1>
                </DropdownTab>
                <CatalogueCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'">
                    <template #item-name>JACKET</template>
                    <template #price>60 AED</template>
                    <template #description>Lorem ipsum dolor sit amet consectet. Faucibus mattis sceleris.</template>
                </CatalogueCard>

                <CatalogueCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'" available="notavailable">
                    <template #item-name>JACKET</template>
                    <template #price>60 AED</template>
                    <template #description>Lorem ipsum dolor sit amet consectet. Faucibus mattis sceleris.</template>
                </CatalogueCard>

                <ItemDescription>
                    <template #item-name>PATCHWORK JACKET</template>
                    <template #owner-name>BY JOHN DOE</template>
                    <template #description>Lorem ipsum dolor sit amet consectetur. At et venenatis ac adipiscing. Cum at pharetra feugiat sagittis egestas bibendum.</template>
                    <template #sizing>XS</template>
                    <template #chest-size>34</template>
                    <template #neck-size>14.5</template>
                    <template #waist-size>27</template>
                    <template #arm-size>30.5</template>
                </ItemDescription>
                <BookingSummary>
                    <template #date>Saturday, 18 March 2023</template>
                    <template #name>Kids & Teens Sewing Club</template>
                    <template #time>10:00am - 11:00am</template>
                    <template #code>SW898LVMB4</template>
                    <template #price>70 AED</template>
                    <template #count>2</template>
                </BookingSummary>

                <Pagination :total-items="100" :items-per-page="10" :current-page="1">
                </Pagination>
            </div>
        </div>
    </main>
</template>
<style scoped lang="scss">
    .test {
        max-width: 100%;
        @include flex-col;
        align-items: center;
        justify-content: center;
        padding-block: 10vmin;

        .test-wrapper {
            max-width: 600px;
            width: 50%;
            @include flex-col;
            align-items: center;
            justify-content: center;

            .icon{
                margin:10px;
            }
        }
    }

</style>