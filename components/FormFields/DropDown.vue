<script setup lang="ts">
interface Props {
    options: {
        label: string,
        value: string
    }[],
    modelValue: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const selected = useVModel(props, 'modelValue', emit)

const [visible, toggleVisibility] = useToggle(false)

function select (selection: string) {
  selected.value = selection
  selectedLabel.value = props.options.find(option => option.value === selection)?.label ?? ''
  toggleVisibility()
}

const selectedLabel = ref(props.options.find(
  option => option.value === selected.value)?.label ?? selected.value)

// for targetting the element to attach the click outside event to
const target = ref<HTMLElement>()

onMounted(() => {
  selected.value = props.options[0].value

  onClickOutside(target, () => {
    visible.value = false
  })
})
</script>

<template>
  <div
    ref="target"
    class="bg-secondary text-white cursor-pointer relative min-w-[10rem]"
    :class="(visible) ? ['rounded-t-lg']: ['rounded-lg']"
  >
    <div
      class="px-4 py-3 flex justify-between"
      @click="() => toggleVisibility()"
    >
      <span>{{ selectedLabel }}</span>
      <span :class="(visible) ? ['text-accent-1']: ''">V</span>
    </div>
    <ul
      class="flex flex-col absolute bg-secondary w-full rounded-b-lg z-50"
      :class="(visible) ? ['']: ['hidden']"
    >
      <li
        v-for="option in options"
        :key="option.value"
        class="px-4 py-3 hover:bg-white hover:bg-opacity-20 hover:text-white"
        @click="() => select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
