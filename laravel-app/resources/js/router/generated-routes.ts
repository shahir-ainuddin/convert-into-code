import type { RouteRecordRaw } from 'vue-router'

export const generatedRoutes: RouteRecordRaw[] = [
  {
    name: 'Page',
    path: '/page',
    component: () => import('../pages/generated/PagePage.vue')
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('../pages/generated/ScreenPage.vue')
  },
  {
    name: 'Test',
    path: '/test',
    component: () => import('../pages/generated/TestPage.vue')
  },
  {
    name: 'User',
    path: '/user',
    component: () => import('../pages/generated/UserPage.vue')
  }
]
