import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/addbook',
      component: () => import('../views/AddGeusbook.vue'),
    },
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    }
  ]
})

export default router