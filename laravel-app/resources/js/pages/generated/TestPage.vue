<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TestForm from '../../components/generated/TestForm.vue'
import TestTable from '../../components/generated/TestTable.vue'

const rows = ref<any[]>([])
const errorMessage = ref('')
const isSaving = ref(false)

async function loadRows() {
  const response = await fetch('/generated-api/tests', {
    credentials: 'same-origin'
  })
  if (!response.ok) {
    errorMessage.value = 'Failed to load data from database.'
    return
  }
  errorMessage.value = ''
  rows.value = await response.json()
}

async function onSubmit(payload: Record<string, unknown>) {
  isSaving.value = true
  errorMessage.value = ''
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
  try {
    const response = await fetch('/generated-api/tests', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      errorMessage.value = 'Save failed. Please check backend route/migration and try again.'
      return
    }

    await loadRows()
  } catch (error) {
    errorMessage.value = 'Save failed due to network/server error.'
  } finally {
    isSaving.value = false
  }
}

onMounted(loadRows)
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Test Form</h2>
      <TestForm @submit="onSubmit" />
      <p v-if="isSaving" class="mt-2 text-sm text-slate-600">Saving...</p>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Test Table</h2>
      <TestTable :rows="rows" />
    </section>
  </main>
</template>
