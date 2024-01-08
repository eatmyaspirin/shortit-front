<template>
  <div class="wrapper">
    <div class="background">
      <div class="left">Shortit</div>
      <InputGroup class="auth-group">
        <span class="p-float-label">
          <InputText id="username" v-model="userinfo.username" />
          <label for="username">Username</label>
        </span>
        <span class="p-float-label">
          <InputText id="password" type="password" v-model="userinfo.password" />
          <label for="password">Password</label>
        </span>
        <div class="action-button">
          <AltButton class="login" @click="onClickLogin">Login</AltButton>
          <AltButton class="register-btn" @click="onClickRegister">Register</AltButton>
          <RouterLink class="forgot" to="/forgot">Forgot password?</RouterLink>
        </div>
      </InputGroup>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from '../axios.config'
import router from '@/router';
import {useUserStore} from '@/stores/user'  
const userStore = useUserStore();

const userinfo = ref({
  username: '',
  password: ''
})

const onClickLogin = () => {
  axios.post('/login', {
    'username': userinfo.value.username,
    'password': userinfo.value.password
    }).then((res)=>{
      console.log(res)
      if(res.status == 200 && res.data.userId) {
        userStore.login({'username': res.data.userId, 'userId': res.data.userId})
        router.push('/')
      }
    })
}

const onClickRegister = () => {
  axios.get('/user/getMyURLs').then((resp)=>{console.log(resp)})
}
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

.left {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 52px;
  font-family: fantasy;
}
.background {
  display: flex;
  height: 500px;
  background-size: cover;
  border-radius: 4px;
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: inset 0 0 0 500px rgba(255, 255, 255, 0.1);
}
.auth-group {
  display: flex;
  width: 400px;
  flex-direction: column;
  padding: 24px 24px;
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

.register-btn {
  background-color: #9cd1cb;
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
