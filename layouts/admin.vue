<script lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#f00'
  },
  Button: {
    textColor: '#f00'
  },
  Input: {
    textColor: '#f00'
  }
}
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
