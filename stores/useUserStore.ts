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

  function initialise (userInfo: User) {
    name.value = userInfo.name
    email.value = userInfo.email
    id.value = userInfo.id
  }

  return { user, $reset, initialise, isSet }
})
