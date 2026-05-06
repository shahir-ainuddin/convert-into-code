import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { generatedRoutes } from './generated-routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: generatedRoutes[0]?.path ?? '/'
  },
  ...generatedRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
