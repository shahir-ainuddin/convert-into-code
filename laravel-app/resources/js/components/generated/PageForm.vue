<script setup lang="ts">
import { reactive } from 'vue'

type PageFormState = {
  page_code: string;
  page_name: string
}

const form = reactive<PageFormState>({
  page_code: '',
  page_name: ''
})
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4">
    <div class="flex items-center gap-3">
      <label for="page_code" class="text-sm font-medium text-gray-700 min-w-32">
        Page Code
      </label>
      <input
        id="page_code"
        v-model="form.page_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="page_name" class="text-sm font-medium text-gray-700 min-w-32">
        Page Name
      </label>
      <input
        id="page_name"
        v-model="form.page_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
  </form>
</template>
