import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from '../axios.config'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async () => {
        await axios.post('/logout')
        useUserStore().logout()
        router.go()
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue')
    },
    {
      path: '/:shortUrl',
      component: () => import('../views/PasteView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const privatePages = ['/manage']
  const authRequired = privatePages.includes(to.path)
  const auth = useUserStore()

  if (authRequired && !auth.user.userId) {
    return '/login'
  }
})

export default router
