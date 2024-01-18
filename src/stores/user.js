import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    'username': '',
    'userId': '',
    'loggedIn': '',
  })
  const getUserName = computed(() => user.value.username)
  const isLoggedIn = computed(() => user.value.username.length != 0)
  const login = (userInfo) => {
    user.value = userInfo;
  }
  const logout = () => {
    user.value = {
      'username': '',
      'userId': '',
      'loggedIn': '',
    };
    localStorage.removeItem("state");
  }
  return { user, getUserName, isLoggedIn, login, logout }
})
