<script setup lang="ts">
import { reactive, watch } from 'vue'

type FileFormState = {
  file_code: string;
  file_name: string;
  is_active: boolean;
  is_visible: boolean
}

const form = reactive<FileFormState>({
  file_code: '',
  file_name: '',
  is_active: false,
  is_visible: false
})

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<FileFormState> | null
    submitLabel?: string
  }>(),
  {
    modelValue: null,
    submitLabel: 'Save'
  }
)

watch(
  () => props.modelValue,
  (value) => {
    form.file_code = value?.file_code ?? ''
    form.file_name = value?.file_name ?? ''
    form.is_active = value?.is_active ?? false
    form.is_visible = value?.is_visible ?? false
  },
  { immediate: true, deep: true }
)

const emit = defineEmits<{
  submit: [payload: FileFormState]
}>()

function onSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4" @submit.prevent="onSubmit">
    <div class="flex items-center gap-3">
      <label for="file_code" class="text-sm font-medium text-gray-700 min-w-32">
        File Code
      </label>
      <input
        id="file_code"
        v-model="form.file_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="file_name" class="text-sm font-medium text-gray-700 min-w-32">
        File Name
      </label>
      <input
        id="file_name"
        v-model="form.file_name"
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
    <div>
      <button
        type="submit"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        {{ props.submitLabel }}
      </button>
    </div>
  </form>
</template>
