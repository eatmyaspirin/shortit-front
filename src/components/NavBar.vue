<template>
  <div class="card">
    <MenuBar :model="items">
      <template #item="{ item, props }">
        <a v-ripple v-if="item.isAuth" :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
        </a>
    </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <div class="auth">
            <RouterLink v-if="userStore.isLoggedIn" to="/logout">Logout</RouterLink>
            <RouterLink v-else to="/login">Login</RouterLink>
            <span v-if="userStore.isLoggedIn">{{ userStore.user.username }}</span>
          </div>
        </div>
      </template>
    </MenuBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const router = useRouter();

const items = ref([
  {
    label: 'Create',
    icon: 'pi pi-plus',
    isAuth: true,
    command: () => {
        router.push({ path: '/'})
    }
  },
  {
    label: 'Manage',
    icon: 'pi pi-cog',
    isAuth: userStore.isLoggedIn,
    command: () => {
        router.push({ path: '/manage'})
    }
  }
])
</script>

<style>
.auth > *{
    text-decoration: none;
    margin-right: 40px;
    color: white;
}

.p-menubar {
  border-radius: 0;
}
</style>
