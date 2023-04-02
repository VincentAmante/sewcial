<template>
  <button>
    <slot>
      Button!
    </slot>
  </button>
</template>

<style scoped lang="scss">
    button {
        background-color: $clr-secondary;
        color: $clr-primary;
        padding: 1em;
        padding-inline: 2em;
        border-radius: 25px;
        border: 0;
        cursor: pointer;
    }
</style>
