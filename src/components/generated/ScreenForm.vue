<script setup lang="ts">
import { reactive } from 'vue'

type ScreenFormState = {
  screen_code: string;
  screen_name: string;
  module_name: string;
  route_path: string;
  sort_order: string;
  is_active: boolean;
  is_visible: boolean
}

const form = reactive<ScreenFormState>({
  screen_code: '',
  screen_name: '',
  module_name: '',
  route_path: '',
  sort_order: '',
  is_active: false,
  is_visible: false
})
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4">
    <div class="flex items-center gap-3">
      <label for="screen_code" class="text-sm font-medium text-gray-700 min-w-32">
        Screen Code
      </label>
      <input
        id="screen_code"
        v-model="form.screen_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="screen_name" class="text-sm font-medium text-gray-700 min-w-32">
        Screen Name
      </label>
      <input
        id="screen_name"
        v-model="form.screen_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="module_name" class="text-sm font-medium text-gray-700 min-w-32">
        Module Name
      </label>
      <input
        id="module_name"
        v-model="form.module_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="route_path" class="text-sm font-medium text-gray-700 min-w-32">
        Route Path
      </label>
      <input
        id="route_path"
        v-model="form.route_path"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="sort_order" class="text-sm font-medium text-gray-700 min-w-32">
        Sort Order
      </label>
      <input
        id="sort_order"
        v-model="form.sort_order"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="is_active" class="text-sm font-medium text-gray-700 min-w-32">
        Is Active
      </label>
      <input
        id="is_active"
        v-model="form.is_active"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="is_visible" class="text-sm font-medium text-gray-700 min-w-32">
        Is Visible
      </label>
      <input
        id="is_visible"
        v-model="form.is_visible"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  </form>
</template>
