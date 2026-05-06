<script setup lang="ts">
import { reactive } from 'vue'

type UserFormState = {
  user_code: string;
  user_name: string
}

const form = reactive<UserFormState>({
  user_code: '',
  user_name: ''
})

const emit = defineEmits<{
  submit: [payload: UserFormState]
}>()

function onSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4" @submit.prevent="onSubmit">
    <div class="flex items-center gap-3">
      <label for="user_code" class="text-sm font-medium text-gray-700 min-w-32">
        User Code
      </label>
      <input
        id="user_code"
        v-model="form.user_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="user_name" class="text-sm font-medium text-gray-700 min-w-32">
        User Name
      </label>
      <input
        id="user_name"
        v-model="form.user_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <button
        type="submit"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Save
      </button>
    </div>
  </form>
</template>
