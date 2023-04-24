<script setup lang="ts">
import SpeechBubble from '@/components/SpeechBubble.vue'
import CatalogueCard from '@/components/CatalogueCard.vue'
import IconFilterBlue from '@/components/icons/IconFilterBlue.vue'
import Pagination from '@/components/Pagination.vue'

definePageMeta({
  layout: 'shop'
})

const { data: items } = useFetch('/api/CatalogueItems/')
const filteredItems = ref(items)

function filter () {
  if (items.value === null) { return }

  filteredItems.value = items.value.filter((item: any) => {
    const tags = item.tags

    for (const tag of tags) {
      if (tag.tagName.toLowerCase().includes('activewear')) {
        return true
      }
    }
    return false
  })
}

function toItem (itemUrl: string) {
  useRouter().push(`/shop/${itemUrl}`)
}
</script>

<template>
  <main>
    <!-- <div>
      <h1>Items Unfiltered</h1>
      <div>
        {{ items }}
      </div>
    </div>
    <div>
      <h1>Filtered Items</h1>
      <div>
        {{ filteredItems }}
      </div>
    </div>
    <AppButton @click="() => filter()">
      Filter
    </AppButton> -->
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
        <IconFilterBlue />
        <p>FILTER</p>
      </div>
      <div class="filters-container">
        <p>HIDE FILTERS</p>
        <DropdownTab>
          <h1>SHOP BY</h1>
        </DropdownTab>
        <DropdownTab>
          <h1>STYLE</h1>
        </DropdownTab>
        <DropdownTab>
          <h1>PRICE</h1>
        </DropdownTab>
        <button>
          <p class="button">
            APPLY FILTERS
          </p>
        </button>
      </div>

      <!-- Catalogue Items -->
      <div class="grid-container">
        <div class="catalogue-grid">
          <CatalogueCard
            v-for="item in items"
            :key="item.id"
            :image="item.imageSrc"
            @click="() => toItem(item.id)"
          >
            <template #item-name>
              {{ item.name }}
            </template>
            <template #price>
              {{ item.priceAED }} AED
            </template>
            <template #description>
              {{ item.description }}
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
