<script setup lang="ts">
// Import heart
import IconHeart from '@/components/icons/IconHeart.vue'

// Variables passed to this component are props
const props = defineProps({
  alignment: {
    type: String,
    required: true,
    default: 'left'
  },
  isLiked: {
    type: Boolean,
    required: false,
    default: false
  }
})

const liked = ref(props.isLiked)

watchEffect(() => {
  liked.value = props.isLiked
})

function toggleLike () {
  liked.value = !liked.value
}
const likedStyle = computed(() => {
  return (liked.value) ? 'accent-2' : 'accent-1'
})
const likedContent = computed(() => {
  return (liked.value) ? 'LIKED!' : 'LIKE ME!'
})
</script>

<!-- Template with default text and icon -->
<template>
  <SpeechBubble
    :colour-override="likedStyle"
    @click="() => toggleLike()"
  >
    <div class="flex flex-row items-center justify-between gap-4 px-8 text-alt align-middle">
      <p>{{ likedContent }}</p>
      <IconHeart class="icon" />
    </div>
  </SpeechBubble>
  <!-- <div class="like-me flex flex-row self-start content-center rounded-2xl text-primary bg-accent-1 m-1 p-1 px-7 relative" :class="alignment">

  </div> -->
</template>
