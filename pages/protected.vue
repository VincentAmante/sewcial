
<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data, signOut } = useAuth()

const session = useAuth().getSession()
</script>

<template>
  <div>
    <div>I'm protected! Session data: {{ data }}</div>
    <div>session: {{ session }}</div>
    <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
      sign out
    </button>
  </div>
</template>
