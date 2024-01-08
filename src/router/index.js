import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';
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
      component: () => import('../views/LoginView.vue'),
      meta: {
        hideNavbar: true,
       }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async () => {
        await axios.post("/logout");
        useUserStore().logout();
        router.go();
      },
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue')
    },

  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useUserStore();

  if (authRequired && !auth.user.userId) {
      return '/login';
  }
});

export default router
