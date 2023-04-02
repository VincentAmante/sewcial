<script setup lang="ts">
</script>
<template>
  <main>
    <!-- Just test divs, don't mind -->
    <div class="test">
      <div class="test-wrapper">
        <ItemImage :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'" />

        <!-- A component with slots in action -->
        <SpeechBubble>
          <h2>FRANKIE</h2>
          <p>This bubble contains all the blue and cream icons created during my session!</p>
          <div>
            <ButtonDownload class="icon" />
            <ButtonFullscreen class="icon" />
            <ButtonLikedPage class="icon" />
            <IconHeart class="icon" />
            <IconPlus class="icon" />
            <IconCreditCard class="icon" />
            <IconChevronLeft class="icon" />
            <IconChevronRight class="icon" />
            <IconFilter class="icon" />
          </div>
        </SpeechBubble>
        <!-- Component with a prop, the one above uses a default -->
        <SpeechBubble alignment="right">
          <h2>FRANKIE</h2>
          <p>Some pink and cream icons from the same sessions :)</p>
          <div>
            <IconUser class="icon" />
          </div>
        </SpeechBubble>

        <SpeechBubble>
          <h2>FRANKIE</h2>
          <p>Below, there are some big boy assets, like cards and buttons.</p>
          <div />
        </SpeechBubble>
        <p>-------------------------------------------------</p>
        <LikeMeButton />
        <LikedButton />
        <DownloadButton />
        <TemplateCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'">
          <template #item-name>
            ITEM NAME
          </template>
          <template #owner>
            OWNER
          </template>
          <template #description>
            Short description
          </template>
        </TemplateCard>
        <DropDownTab>
          <h1>SHOP BY</h1>
        </DropDownTab>
        <DropdownTab>
          <h1>STYLE</h1>
        </DropdownTab>
        <DropdownTab>
          <h1>PRICE</h1>
        </DropdownTab>
        <CatalogueCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'">
          <template #item-name>
            JACKET
          </template>
          <template #price>
            60 AED
          </template>
          <template #description>
            Lorem ipsum dolor sit amet consectet. Faucibus mattis sceleris.
          </template>
        </CatalogueCard>

        <CatalogueCard :image="'https://i.pinimg.com/564x/e1/cf/a1/e1cfa1a284fb717a0ef3023d7ee3e924.jpg'" available="notavailable">
          <template #item-name>
            JACKET
          </template>
          <template #price>
            60 AED
          </template>
          <template #description>
            Lorem ipsum dolor sit amet consectet. Faucibus mattis sceleris.
          </template>
        </CatalogueCard>

        <ItemDescription>
          <template #item-name>
            PATCHWORK JACKET
          </template>
          <template #owner-name>
            BY JOHN DOE
          </template>
          <template #description>
            Lorem ipsum dolor sit amet consectetur. At et venenatis ac adipiscing. Cum at pharetra feugiat sagittis egestas bibendum.
          </template>
          <template #sizing>
            XS
          </template>
          <template #chest-size>
            34
          </template>
          <template #neck-size>
            14.5
          </template>
          <template #waist-size>
            27
          </template>
          <template #arm-size>
            30.5
          </template>
        </ItemDescription>
        <BookingSummary>
          <template #date>
            Saturday, 18 March 2023
          </template>
          <template #name>
            Kids & Teens Sewing Club
          </template>
          <template #time>
            10:00am - 11:00am
          </template>
          <template #code>
            SW898LVMB4
          </template>
          <template #price>
            70 AED
          </template>
          <template #count>
            2
          </template>
        </BookingSummary>

        <Pagination :total-items="100" :items-per-page="10" :current-page="1" />
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
