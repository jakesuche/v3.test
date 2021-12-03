import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/login',
  component: () => import('@/layouts/Public.vue'),
  children: [
    {
      name: 'Login',
      path: '',
      component: () => import('@/views/Public/Login.vue'),
    },
  ],
} as RouteRecordRaw;
