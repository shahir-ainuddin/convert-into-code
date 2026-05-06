<script setup lang="ts">
type PageRow = {
  page_code: string;
  page_name: string
}

withDefaults(
  defineProps<{
    rows: PageRow[]
  }>(),
  {
    rows: () => []
  }
)
</script>

<template>
  <div class="overflow-x-auto rounded-md border border-gray-200 bg-white">
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Page Code
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Page Name
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.page_code === 'boolean'">
              {{ row.page_code ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.page_code }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.page_name === 'boolean'">
              {{ row.page_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.page_name }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
