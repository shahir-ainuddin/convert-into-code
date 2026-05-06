<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FileForm from '../../components/generated/FileForm.vue'
import FileTable from '../../components/generated/FileTable.vue'

const rows = ref<any[]>([])
const editingId = ref<number | null>(null)
const formModel = ref<Record<string, unknown> | null>(null)
const errorMessage = ref('')
const isSaving = ref(false)
const isDeletingModule = ref(false)

async function loadRows() {
  const response = await fetch('/generated-api/files', {
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
      ? `/generated-api/files/${editingId.value}`
      : '/generated-api/files'
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

async function onDeleteModule() {
  const confirmed = window.confirm('Delete this module completely? This removes UI files, controller, routes, migration file and table.')
  if (!confirmed) return

  isDeletingModule.value = true
  errorMessage.value = ''
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''

  try {
    const response = await fetch('/generated-api/modules/File', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token
      }
    })

    if (!response.ok) {
      errorMessage.value = 'Module delete failed.'
      return
    }

    window.location.assign('/?_refresh=' + Date.now())
  } catch (error) {
    errorMessage.value = 'Module delete failed due to network/server error.'
  } finally {
    isDeletingModule.value = false
  }
}

onMounted(loadRows)
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">File Form</h2>
      <FileForm :model-value="formModel" :submit-label="editingId ? 'Update' : 'Save'" @submit="onSubmit" />
      <p v-if="isSaving" class="mt-2 text-sm text-slate-600">Saving...</p>
      <button
        type="button"
        class="mt-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        :disabled="isDeletingModule"
        @click="onDeleteModule"
      >
        {{ isDeletingModule ? 'Deleting Module...' : 'Delete Module' }}
      </button>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">File Table</h2>
      <FileTable :rows="rows" @edit="onEdit" />
    </section>
  </main>
</template>
