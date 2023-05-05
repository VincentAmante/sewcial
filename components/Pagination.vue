<script setup lang = "ts">
// Import Chevrons
import IconChevronLeft from './icons/IconChevronLeft.vue'
import IconChevronRight from './icons/IconChevronRight.vue'

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
  getPage({ currentPage: 1, currentPageSize: currentPageSize.value })
})
</script>

<template>
  <div>
    <ul class="flex justify-center content-center mt-3 list-none">
      <li
        class="inline-block mr-2"
        :class="(isFirstPage) ? ['opacity-50' , 'pointer-events-none'] : ['']"
      >
        <a class="chevron" href="#" @click="() => prev()">
          <IconChevronLeft />
        </a>
      </li>
      <li
        v-for="pageNum in pageCount"
        :key="pageNum"
        class="inline-block mr-2"
        :class="(currentPage !== pageNum) ? ['hover:opacity-75'] : ['cursor-default']"
      >
        <a
          class="page-link p-2 px-4 rounded-full"
          href="#"
          :class="(currentPage === pageNum) ? ['bg-accent-1', 'text-primary', 'cursor-default', 'pointer-events-none'] : ['']"
          @click="currentPage = pageNum"
        >{{ pageNum }}</a>
      </li>
      <li class="inline-block mr-2" :class="(isLastPage) ? ['opacity-50' , 'pointer-events-none'] : ['']">
        <a class="chevron" href="#" @click="() => next()">
          <IconChevronRight />
        </a>
      </li>
    </ul>
  </div>
</template>
