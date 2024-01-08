import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    'username': '',
    'userId': ''
  })
  const getUserName = computed(() => user.value.username)
  const isLoggedIn = computed(() => user.value.username != 0)
  const login = (userInfo) => {
    user.value = userInfo;
  }
  const logout = () => {
    user.value = {
      'username': '',
      'userId': ''
    };
    localStorage.removeItem("state");
  }
  return { user, getUserName, isLoggedIn, login, logout }
})
