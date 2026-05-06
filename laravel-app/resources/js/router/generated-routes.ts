import type { RouteRecordRaw } from 'vue-router'

export const generatedRoutes: RouteRecordRaw[] = [
  {
    name: 'Test',
    path: '/test',
    component: () => import('../pages/generated/TestPage.vue')
  }
]
