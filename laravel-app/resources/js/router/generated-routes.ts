import type { RouteRecordRaw } from 'vue-router'

export const generatedRoutes: RouteRecordRaw[] = [
  {
    name: 'File',
    path: '/file',
    component: () => import('../pages/generated/FilePage.vue')
  },
  {
    name: 'Image',
    path: '/image',
    component: () => import('../pages/generated/ImagePage.vue')
  }
]
