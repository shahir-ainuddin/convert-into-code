<script setup lang="ts">
type UserRow = {
  user_code: string;
  user_name: string
}

withDefaults(
  defineProps<{
    rows: UserRow[]
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
            User Code
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            User Name
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.user_code === 'boolean'">
              {{ row.user_code ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.user_code }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.user_name === 'boolean'">
              {{ row.user_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.user_name }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
