import type { RouteRecordRaw } from 'vue-router'

export const generatedRoutes: RouteRecordRaw[] = [
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('../pages/generated/ScreenPage.vue')
  }
]
