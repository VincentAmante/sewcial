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

<!-- Scoped Styling -->
<!-- <style scoped lang="scss">
    .like-me {
        border-radius: 20px;
        color: $clr-primary;
        background-color: $clr-accent-1;
        margin: 5px;
        padding: .35em;
        padding-inline: 1.75em;
        width: 80%; //adjusts according to the size of container
        position: relative;

        display: flex;
        flex-direction: row;

        align-self: flex-start;
        justify-content: center;

        max-width: 40ch; //remove if not wide enough, was added for tests
        .arrow {
                z-index: -1;
                width: 0;
                height: 0;
                border-bottom: 20px solid $clr-accent-1;
                border-left: 50px solid transparent;
                left: 0px;
                bottom: 0px;
                transform: translateY(-.05em) translateX(-2.5em) rotate(-15deg);
                position: absolute;
        }

        .icon {
            justify-self: center;
            align-self: center;
            margin-inline: 1vw;
        }

    }
</style> -->
