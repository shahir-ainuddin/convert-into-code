<script setup lang="ts">
type UserRow = {
  user_code: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_admin: boolean
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
            Full Name
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Email
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Phone Number
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Active
          </th>
          <th class="px-4 py-3 text-left font-semibold text-gray-700">
            Is Admin
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
            <span v-if="typeof row.full_name === 'boolean'">
              {{ row.full_name ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.full_name }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.email === 'boolean'">
              {{ row.email ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.email }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.phone_number === 'boolean'">
              {{ row.phone_number ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.phone_number }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.is_active === 'boolean'">
              {{ row.is_active ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.is_active }}</span>
          </td>
          <td class="px-4 py-3 text-gray-700">
            <span v-if="typeof row.is_admin === 'boolean'">
              {{ row.is_admin ? 'Yes' : 'No' }}
            </span>
            <span v-else>{{ row.is_admin }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
