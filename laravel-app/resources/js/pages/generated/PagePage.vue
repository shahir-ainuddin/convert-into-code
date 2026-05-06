<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageForm from '../../components/generated/PageForm.vue'
import PageTable from '../../components/generated/PageTable.vue'

const rows = ref<any[]>([])
const editingId = ref<number | null>(null)
const formModel = ref<Record<string, unknown> | null>(null)
const errorMessage = ref('')
const isSaving = ref(false)

async function loadRows() {
  const response = await fetch('/generated-api/pages', {
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
    const isEditing = editingId.value !== null
    const targetUrl = isEditing
      ? `/generated-api/pages/${editingId.value}`
      : '/generated-api/pages'
    const response = await fetch(targetUrl, {
      method: isEditing ? 'PUT' : 'POST',
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

    editingId.value = null
    formModel.value = null
    await loadRows()
  } catch (error) {
    errorMessage.value = 'Save failed due to network/server error.'
  } finally {
    isSaving.value = false
  }
}

function onEdit(row: Record<string, unknown>) {
  editingId.value = Number(row.id)
  formModel.value = { ...row }
}

onMounted(loadRows)
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Page Form</h2>
      <PageForm :model-value="formModel" :submit-label="editingId ? 'Update' : 'Save'" @submit="onSubmit" />
      <p v-if="isSaving" class="mt-2 text-sm text-slate-600">Saving...</p>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Page Table</h2>
      <PageTable :rows="rows" @edit="onEdit" />
    </section>
  </main>
</template>
