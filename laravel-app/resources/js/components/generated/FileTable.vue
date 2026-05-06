<script setup lang="ts">
type FileRow = {
  id: number
  file_code: string;
  file_name: string;
  is_active: boolean;
  is_visible: boolean
}

const props = withDefaults(
  defineProps<{
    rows: FileRow[]
  }>(),
  {
    rows: () => []
  }
)

const emit = defineEmits<{
  edit: [row: FileRow]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-md border border-gray-200 bg-white">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            File Code
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            File Name
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Active
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Visible
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="row in props.rows" :key="row.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.file_code === 'boolean'">
              {{ row.file_code ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.file_code }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.file_name === 'boolean'">
              {{ row.file_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.file_name }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.is_active === 'boolean'">
              {{ row.is_active ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.is_active }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.is_visible === 'boolean'">
              {{ row.is_visible ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.is_visible }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <button
              type="button"
              class="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium hover:bg-slate-100"
              @click="emit('edit', row)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
