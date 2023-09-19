import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterDetail from '../views/CharacterDetail.vue';
import EpisodeView from '../views/EpisodeView.vue';
import AppGuerraVue from '../views/AppGuerra.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/character/:id',
      name: 'character',
      component: CharacterDetail,
      props: true
    },
    {
      path: '/episode/:id',
      name: 'episode',
      component: EpisodeView,
      props: true
    },
    {
      path: '/guerra',
      name: 'guerra',
      component: AppGuerraVue
    }
  ]
})

export default router
