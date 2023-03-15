import { createRouter, createWebHistory } from 'vue-router';
import GlobalFeed from '../views/GlobalFeed.vue';
import Register from '@/views/Register';
import Login from '@/views/Login';

export const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed,
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
