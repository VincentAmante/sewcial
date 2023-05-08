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
  const isSet = ref(false)

  const isUserSet = computed(() => {
    return isSet.value
  })

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
    isSet.value = false
  }

  function initialise (userName: string, userEmail: string, userId: string) {
    // const userJson = JSON.parse(userInfo) as User
    name.value = userName
    email.value = userEmail
    id.value = userId
    isSet.value = true
  }

  return { user, $reset, initialise, isUserSet }
})
