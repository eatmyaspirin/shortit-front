<template>
  <MenuBar :model="items">
    <template #item="{ item, props }">
      <a
        v-if="item.label == 'Manage'? userStore.isLoggedIn : true"
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <div class="auth">
          <RouterLink v-if="userStore.isLoggedIn" to="/logout"
            ><i class="pi pi-sign-out"></i>Logout</RouterLink
          >
          <RouterLink v-else to="/login"><i class="pi pi-sign-in"></i>Login</RouterLink>
          <span v-if="userStore.isLoggedIn">{{ userStore.user.username }}</span>
        </div>
      </div>
    </template>
  </MenuBar>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()

const items = ref([
  {
    label: 'Create',
    icon: 'pi pi-plus',
    isAuth: true,
    command: () => {
      router.push({ path: '/' })
    }
  },
  {
    label: 'Manage',
    icon: 'pi pi-cog',
    isAuth: userStore.isLoggedIn,
    command: () => {
      router.push({ path: '/manage' })
    }
  }
])
</script>

<style>
.auth > * {
  text-decoration: none;
  margin-right: 40px;
  color: #18b1a1;
  font-weight: bold;
}
.auth > *:hover {
  color: white;
}

.pi.pi-sign-out {
  margin-right: 8px;
}

.pi.pi-sign-in {
  margin-right: 8px;
}
.p-menubar {
  border-radius: 0;
  backdrop-filter: blur(0.2px);
  background: none;
  border: none;
  background-color: #0e5e53;
  position: fixed;
  top: 0px;
  width: 100%;
}

.p-menuitem-link {
  color: #18b1a1;
  font-weight: bold;
}

.p-menuitem.p-focus {
  background-color: none;
  background: none;
}
</style>
