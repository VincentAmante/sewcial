import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  type User = {
    name: string
    email: string
    id: string
  }

  const name = ref('')
  const email = ref('')
  const id = ref('')
  const isSet = computed(() => name.value !== '' && email.value !== '' && id.value !== '')

  const user = computed(() => {
    return {
      name: name.value,
      email: email.value,
      id: id.value
    } as User
  })

  function $reset () {
    name.value = ''
    email.value = ''
    id.value = ''
  }

  function initialise (userInfo: string) {
    const userJson = JSON.parse(userInfo) as User

    name.value = userJson.name
    email.value = userJson.email
    id.value = userJson.id
  }

  return { user, $reset, initialise, isSet }
})
