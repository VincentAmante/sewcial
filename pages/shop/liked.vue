<script setup lang = "ts">
import type { CatalogueItem } from '@prisma/client'
import TiltedHeading from '@/components/TiltedHeading.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import CatalogueCard from '@/components/CatalogueCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useUserStore } from '~/stores/useUserStore'

definePageMeta({
  layout: 'shop',
  middleware: 'auth'
})
const { user } = useUserStore()
const { data, pending, error, refresh } = useFetch('/api/CatalogueItems/getLiked', {
  body: JSON.stringify({
    userId: user.id
  }),
  onResponse ({ response }) {
    const data = response._data
    console.log(data)
  }
})
</script>

<template>
  <main>
    <div class="container">
      <!-- Left sticker -->
      <img class="elements-left hidden absolute right-[90%] top-[15%] desktop:flex" src="@/assets/images/Sticker_1.png" width="190" height="250" alt="">

      <!-- Page Heading -->
      <div class="heading-container flex flex-row content-center justify-center py-8 tablet:py-20">
        <div class="page-heading">
          <TiltedHeading>
            your liked
          </TiltedHeading>
          <h1 class="text-h-big-boy capitalize text-secondary relative">
            Products
          </h1>
        </div>
      </div>

      <!-- Right sticker -->
      <div class="sticker-position">
        <img class="elements-right" src="@/assets/images/Sticker_2.png" width="150" height="175" alt="">
      </div>
    </div>

    <!-- Browse section -->
    <section class="browse-container text-primary flex justify-between pt-12 my-8">
      <!-- Filters -->
      <div class="filter">
        <p>400 ITEMS</p>

        <div class="filter-dropdown">
          <IconFilterBlue />
          <p>Filter</p>
        </div>
      </div>

      <!-- Template Grid -->
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
    </section>
    <!-- Paginate -->
    <div class="paginate">
      <Pagination :total-items="9" :items-per-page="6" :current-page="1" />
    </div>
  </main>
</template>

<!-- Styling -->
<style scoped lang="scss">

//Heading
.container {
    .heading-container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    padding-block: 2em;

    @include media(tablet) {
        padding-block: 5em;
    }

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

.sticker-position {
    display: none;
    position: absolute;
    right: 0%;
    bottom: 0%;
    left: 90%;
    top: 18%;

    @include media(desktop) {
        display: flex;
        overflow: hidden;
    }
 }

.elements-left {
    display: none;
    position: absolute;
    right: 90%;
    top: 13%;

    @include media(desktop) {
        display: flex;
    }
}
}

// Products
.browse-container {
    color: $clr-primary;
    display: flex;
    flex-direction: column;
    border-top: 4px dashed $clr-secondary;
    .filter {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 3em;
        margin-inline: 2em;
        color: $clr-secondary;

        @include media (tablet) {
            margin-inline: 4em;
        }

        @include media (desktop) {
            margin-inline: 5em;
        }

        .filter-dropdown {
            display:  flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
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
            }

            .grid-item {
                height: 10%;
            }
        }

    @include media (desktop) {

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
