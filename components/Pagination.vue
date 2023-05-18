<script setup lang = "ts">
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  originalList: {
    type: Array,
    required: true
  },
  altColors: {
    type: Boolean,
    required: false,
    default: false
  }
})
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next
} = useOffsetPagination({
  total: props.originalList.length || 1,
  page: 1,
  pageSize: props.itemsPerPage,
  onPageChange: getPage,
  onPageSizeChange: getPage
})

const origList = ref([...props.originalList])

const emit = defineEmits(['update:modelValue'])
const page = useVModel(props, 'modelValue', emit)

function getPage ({ currentPage, currentPageSize }) {
  page.value = []

  const startIndex = (currentPage - 1) * currentPageSize
  const endIndex = startIndex + currentPageSize
  const currPage = []

  for (const item in origList.value) {
    const index = parseInt(item)
    if (index >= startIndex && index < endIndex) {
      currPage.push(origList.value[index])
    }
  }

  page.value = currPage
}

onMounted(() => {
  getPage({ currentPage: 1, currentPageSize: currentPageSize.value })
})

watch(() => currentPage, () => {
  getPage({ currentPage: currentPage.value, currentPageSize: currentPageSize.value })
})
watchEffect(() => {
  origList.value = [...props.originalList]
  currentPage.value = 1
  getPage({ currentPage: 1, currentPageSize: currentPageSize.value })
})

const textColour = computed(() => {
  return (props.altColors) ? 'text-primary' : 'text-secondary'
})
</script>

<template>
  <div>
    <ul class="flex justify-center content-center mt-3 list-none items-center">
      <li
        class="inline-block mr-2"
        :class="(isFirstPage) ? ['opacity-50' , 'pointer-events-none'] : ['cursor-pointer']"
      >
        <div
          class="chevron"
          :class="textColour"
          @click="() => prev()"
        >
          <AppIcon :icon="['fas', 'chevron-left']" />
        </div>
      </li>
      <li
        v-for="pageNum in pageCount"
        :key="pageNum"
        class="inline-block mr-2"
        :class="(currentPage !== pageNum) ? ['hover:opacity-75'] : ['cursor-default']"
      >
        <div
          class="page-link p-2 px-4 rounded-full"
          :class="(currentPage === pageNum) ? ['bg-accent-1', 'text-primary', 'cursor-default', 'pointer-events-none'] : ['cursor-pointer', textColour]"
          @click="currentPage = pageNum"
        >
          {{ pageNum }}
        </div>
      </li>
      <li class="inline-block mr-2" :class="(isLastPage) ? ['opacity-50' , 'pointer-events-none'] : ['cursor-pointer']">
        <div
          class="chevron"
          :class="textColour"
          @click="() => next()"
        >
          <AppIcon :icon="['fas', 'chevron-right']" />
        </div>
      </li>
    </ul>
  </div>
</template>
