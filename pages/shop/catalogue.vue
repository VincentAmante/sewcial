<script setup lang="ts">
import SpeechBubble from '@/components/SpeechBubble.vue'
import DropDownTab from '@/components/DropDownTab.vue.js'
import CatalogueCard from '@/components/CatalogueCard.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import Pagination from '@/components/Pagination.vue'

definePageMeta({
  layout: 'shop'
})
</script>

<template>
  <main>
    <div class="container">
      <img class="head-img" src="https://via.placeholder.com/600x500">
      <div class="head-text">
        <h1>NEW COLLECTION</h1>
        <h1>Lorem ipsum sit aset dolor</h1>
        <p>I got a condo in Manhattan, baby girl what’s happenin’?</p>
        <SpeechBubble class="speech">
          <p class="button">
            VIEW LIMITED EDITION
          </p>
        </SpeechBubble>
      </div>
    </div>
    <div class="catalogue-container">
      <!-- Filters -->
      <div class="filters-dropdown">
        <IconFilter />
        <p>FILTER</p>
      </div>
      <div class="filters-container">
        <p>HIDE FILTERS</p>
        <DropDownTab>
          <h1>SHOP BY</h1>
        </DropDownTab>
        <DropDownTab>
          <h1>STYLE</h1>
        </DropDownTab>
        <DropDownTab>
          <h1>PRICE</h1>
        </DropDownTab>
        <button>
          <p class="button">
            APPLY FILTERS
          </p>
        </button>
      </div>
      <!-- Catalogue Items -->
      <div class="grid-container">
        <div class="catalogue-grid">
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
        </div>
      </div>
    </div>
    <!-- Paginate -->
    <div class="paginate">
      <Pagination :total-items="9" :items-per-page="6" :current-page="1" />
    </div>
  </main>
</template>

<!-- Styling -->
<style scoped lang = "scss">
    .container {
        display: flex;
        flex-direction: column;
        border-bottom: 4px dashed $clr-secondary;

        @include media (mobile) {
            flex-direction: row;
        }

        .head-img {
            width: 100%;
            height: auto;

            @include media (mobile) {
                width: 50%;
            }
        }

        .head-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-inline:auto;
            margin-block: 2em;
            align-content: center;
            color: $clr-secondary;

            h1 {
                margin-block: 5px;
            }

        }
    }

    .catalogue-container {
    display: flex;
    flex-direction: column;

    .filters-dropdown {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto;
        margin-top: 1.5em;

        p {
            color: $clr-secondary;
            margin-right: 4em;
            margin-left: 2em;
        }
    }

    .filters-container {
        width: 30%;
        border-right: 4px dashed $clr-secondary;
        display: flex;
        flex-direction: column;
        align-content: center;
        padding: 3em;
        display: none;

        p {
            color: $clr-accent-1;
        }

        button {
            background-color: $clr-accent-1;
            border-radius: 10px;
            border: none;
            color: $clr-primary;

            .button {
                color: $clr-primary;
            }
        }
    }

    .grid-container {
        display: flex;
        align-content: center;
        width: 100%;

        .catalogue-grid {
            display: grid;
            grid-template-columns: 50% 50%;
            margin-inline: auto;
            align-self: center;
            justify-content: center;

            @include media (mobile) {
                    grid-template-columns: 45% 45%;
                }

            .grid-item {
                height: 10%;
            }
        }
    }

    @include media (desktop) {
        flex-direction: row;

        .filters-dropdown {
            display: none;
        }

        .filters-container {
            display: flex;
        }

        .grid-container {
            margin-top: 2em;

            .catalogue-grid{
                grid-template-columns: 30% 30% 30%;
            }
        }
    }
}

.paginate {
        margin-block: 2em;
    }

</style>
