<script setup lang="ts">
type ScreenRow = {
  screen_code: string;
  screen_name: string;
  module_name: string;
  route_path: string;
  sort_order: string;
  is_active: boolean;
  is_visible: boolean
}

withDefaults(
  defineProps<{
    rows: ScreenRow[]
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
            Screen Code
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Screen Name
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Module Name
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Route Path
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Sort Order
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Active
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Visible
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.screen_code === 'boolean'">
              {{ row.screen_code ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.screen_code }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.screen_name === 'boolean'">
              {{ row.screen_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.screen_name }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.module_name === 'boolean'">
              {{ row.module_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.module_name }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.route_path === 'boolean'">
              {{ row.route_path ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.route_path }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.sort_order === 'boolean'">
              {{ row.sort_order ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.sort_order }}</span>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>
