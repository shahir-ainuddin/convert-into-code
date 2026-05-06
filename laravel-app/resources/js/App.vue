<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { generatedRoutes } from './router/generated-routes'

const route = useRoute()

const links = computed(() =>
  generatedRoutes.map((item) => ({
    name: String(item.name),
    path: item.path
  }))
)

const isActive = (path: string) => route.path === path
</script>

<template>
  <main class="min-h-screen bg-slate-100 p-8">
    <div class="mx-auto max-w-5xl space-y-6">
      <header class="space-y-3">
        <h1 class="text-2xl font-bold text-slate-800">JSON to Vue Generator Demo</h1>
        <nav class="flex flex-wrap gap-2">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="isActive(link.path)
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 bg-white text-slate-700'"
          >
            {{ link.name }}
          </RouterLink>
        </nav>
      </header>

      <RouterView />
    </div>
  </main>
</template>
