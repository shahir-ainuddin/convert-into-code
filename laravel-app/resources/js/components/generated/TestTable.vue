<script setup lang="ts">
type TestRow = {
  id: number
  test_code: string;
  test_name: string
}

const props = withDefaults(
  defineProps<{
    rows: TestRow[]
  }>(),
  {
    rows: () => []
  }
)

const emit = defineEmits<{
  edit: [row: TestRow]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-md border border-gray-200 bg-white">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Test Code
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Test Name
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="row in props.rows" :key="row.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.test_code === 'boolean'">
              {{ row.test_code ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.test_code }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.test_name === 'boolean'">
              {{ row.test_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.test_name }}</span>
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
