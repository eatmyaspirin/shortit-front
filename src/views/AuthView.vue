<template>
  <div class="wrapper">
    <div class="background">
      <div class="left">Shortit</div>
      <div v-if="router.currentRoute.value.path == '/login'" class="right">
        <span class="auth-label">Login</span>
        <InputGroup class="auth-group">
          <span class="p-float-label">
            <InputText id="username" autocomplete="off" v-model="userinfo.username" />
            <label for="username">Username</label>
          </span>
          <span class="p-float-label">
            <InputText
              id="password"
              type="password"
              autocomplete="off"
              v-model="userinfo.password"
            />
            <label for="password">Password</label>
          </span>
          <div class="action-button">
            <AltButton class="login" @click="onClickLogin">Login</AltButton>
            <AltButton class="alt-btn" @click="router.push('/register')">Register</AltButton>
            <RouterLink class="forgot" to="/forgot">Forgot password?</RouterLink>
          </div>
        </InputGroup>
      </div>
      <div v-if="router.currentRoute.value.path == '/register'" class="right">
        <span class="auth-label">Register</span>
        <InputGroup class="auth-group">
          <span class="p-float-label">
            <InputText id="username" autocomplete="off" v-model="userinfo.username" />
            <label for="username">Username</label>
          </span>
          <span class="p-float-label">
            <InputText
              id="password"
              type="password"
              autocomplete="off"
              v-model="userinfo.password"
            />
            <label for="password">Password</label>
          </span>
          <span class="p-float-label">
            <InputText
              id="cnfm-password"
              type="password"
              autocomplete="off"
              v-model="userinfo.confirmPwd"
            />
            <label for="cnfm-password">Confirm Password</label>
          </span>
          <div class="action-button">
            <AltButton class="login" @click="onClickRegister">Register</AltButton>
            <AltButton class="alt-btn" @click="router.push('/login')">Login</AltButton>
          </div>
        </InputGroup>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axios from '../axios.config'
import router from '@/router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const userinfo = ref({
  username: '',
  password: '',
  confirmPwd: '',
})

const onClickLogin = () => {
  axios
    .post('/login', {
      username: userinfo.value.username,
      password: userinfo.value.password
    })
    .then((res) => {
      console.log(res)
      if (res.status == 200 && res.data.userId) {
        userStore.login({ username: userinfo.value.username, userId: res.data.userId, loggedIn: new Date().getTime() })
        router.push('/')
      }
    })
}

const onClickRegister = () => {
  if(userinfo.value.password == userinfo.value.confirmPwd) {
    axios
      .post('/register', {
        username: userinfo.value.username,
        password: userinfo.value.confirmPwd
      })
      .then((res) => {
        console.log(res)
        if (res.status == 200 && res.data.userId) {
          userStore.login({ username: userinfo.value.username, userId: res.data.userId })
          router.push('/')
        }
      })
  } else {
    alert('Passwords do not match');
  }
}

onMounted(()=>{
  if(userStore.isLoggedIn) {
    router.push('/');
  }
})
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url(../assets/mybackground.jpg);
  background-size: cover;
}

.auth-label {
  font-size: 32px;
  font-weight: 500;
  margin-left: 32px;
  margin-top: 8px;
}
.left {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 52px;
  font-family: fantasy;
}

.right {
  display: flex;
  flex-direction: column;
}
.background {
  display: flex;
  height: 425px;
  padding-right: 24px;
  background-size: cover;
  border-radius: 4px;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 0 500px rgba(255, 255, 255, 0.1);
}
.auth-group {
  display: flex;
  width: 400px;
  flex-direction: column;
  padding: 24px 32px;
  border-radius: 2%;
  justify-content: center;
}
.auth-group > span {
  margin-bottom: 26px;
}
.action-button {
  display: flex;
  flex-direction: column;
}
button {
  justify-content: center;
  color: white;
}
.login {
  margin-bottom: 8px;
  border: none;
}

.alt-btn {
  background-color: #9cd1cb;
}

.alt-btn:hover {
  background-color: #6fa39a;
}

.p-button:focus {
  box-shadow: unset;
}
.forgot {
  display: flex;
  justify-content: end;
  margin-right: 8px;
  margin-top: 4px;
  color: #9bb8b4;
}

label {
  color: #084438;
  font-size: 16px;
}

.p-inputtext {
  background-color: #cde9e6;
  color: #084438;
  border-radius: 5px;
  border: none;
}
</style>
