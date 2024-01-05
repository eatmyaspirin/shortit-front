import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    'username': '',
    'userId': ''
  })
  const getUserName = computed(() => user.value.username)
  function login(userInfo) {
    user.value = userInfo;
  }

  return { user, getUserName, login }
})
