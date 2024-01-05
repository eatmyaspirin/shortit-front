<template>
  <div class="card">
    <MenuBar :model="items">
      <template #end>
        <div class="flex align-items-center gap-2">
          <div class="auth">
            <RouterLink to="/logout">Logout</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
          </div>
        </div>
      </template>
    </MenuBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
        router.push({ path: '/'})
    }
  },
  {
    label: 'Create',
    icon: 'pi pi-plus',
    command: () => {
        router.push({ path: '/create'})
    }
  },
  {
    label: 'Manage',
    icon: 'pi pi-cog',
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
</style>
