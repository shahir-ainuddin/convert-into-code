<script setup lang="ts">
import { reactive, watch } from 'vue'

type TestFormState = {
  test_code: string;
  test_name: string
}

const form = reactive<TestFormState>({
  test_code: '',
  test_name: ''
})

const props = withDefaults(
  defineProps<{
    modelValue?: Partial<TestFormState> | null
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
    form.test_code = value?.test_code ?? ''
    form.test_name = value?.test_name ?? ''
  },
  { immediate: true, deep: true }
)

const emit = defineEmits<{
  submit: [payload: TestFormState]
}>()

function onSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4" @submit.prevent="onSubmit">
    <div class="flex items-center gap-3">
      <label for="test_code" class="text-sm font-medium text-gray-700 min-w-32">
        Test Code
      </label>
      <input
        id="test_code"
        v-model="form.test_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="test_name" class="text-sm font-medium text-gray-700 min-w-32">
        Test Name
      </label>
      <input
        id="test_name"
        v-model="form.test_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
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
