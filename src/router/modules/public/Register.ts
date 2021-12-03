import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'Register',
  path: '/register',
  component: () => import('@/layouts/Public.vue'),
  children: [
    {
      path: '',
      name: 'RegisterStep1',
      component: () => import('@/views/Public/Register/Step1.vue'),
    },
    {
      path: 'step/2/:token/:isGoogle?',
      name: 'RegisterStep2',
      component: () => import('@/views/Public/Register/Step2.vue'),
    },
    {
      path: 'step/3/:token/:isGoogle?',
      name: 'RegisterStep3',
      component: () => import('@/views/Public/Register/Step3.vue'),
    },
    {
      path: 'finished',
      name: 'RegisterFinished',
      component: () => import('@/views/Public/Register/Finished.vue'),
    },
  ],
  // children: [
  //   {
  //     path: '',
  //     name: 'RegisterStep1',
  //     component: () => import('@/views/Public/Register/Step1.vue'),
  //   },
  //   {
  //     path: 'step/2/:token/:isGoogle?',
  //     name: 'RegisterStep2',
  //     component: () => import('@/views/Public/Register/Step2.vue'),
  //   },
  //   {
  //     path: 'step/3/:token/:isGoogle?',
  //     name: 'RegisterStep3',
  //     component: () => import('@/views/Public/Register/Step3.vue'),
  //   },
  //   {
  //     path: 'finished',
  //     name: 'RegisterFinished',
  //     component: () => import('@/views/Public/Register/Finished.vue'),
  //   },
  // ],
} as RouteRecordRaw;
