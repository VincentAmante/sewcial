<script setup lang = "ts">

type Size = {
  name: string
  size: string
}

const props = defineProps<{
  sizes: Size[]
}>()

// The sizings grid gets screwed up CSS-wise if it's not an even number
// so I added this cheap fix
const sizesAdjusted = computed(() => {
  if (props.sizes.length % 2 === 0) {
    return props.sizes
  } else {
    return [...props.sizes, { name: '', size: '' }]
  }
})
</script>

<template lang="">
  <div class="flex flex-col text-secondary mt-6 w-full tablet:mt-0">
    <h1 class="mb-1">
      <slot name="item-name" />
    </h1>

    <h3 class="mb-1">
      <slot name="owner-name" />
    </h3>

    <p class="mb-1">
      <slot name="description" />
    </p>

    <h3 class="sizing flex mt-4 gap-2 text-xl">
      SIZING
      <span><slot name="sizing">SIZING MISSING</slot>
      </span>
    </h3>
  </div>

  <div class="table">
    <ul class="grid grid-cols-2">
      <li
        v-for="(size, index) in sizesAdjusted"
        :key="size.name"
        class="grid grid-cols-2 border-[1px] border-secondary ml-[-1px] mt-[-1px]"
        :class="[(index % 2 === 0) ? 'border-r-0' : '']"
      >
        <p class="border-r-[1px] border-solid border-secondary m-0 p-2">
          {{ size.name }}
        </p>
        <p class="m-0 p-2">
          {{ size.size }}
        </p>
      </li>
    </ul>
  </div>
</template>
