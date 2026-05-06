<script setup lang="ts">
import { reactive } from 'vue'

type UserFormState = {
  user_code: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_admin: boolean
}

const form = reactive<UserFormState>({
  user_code: '',
  full_name: '',
  email: '',
  phone_number: '',
  is_active: false,
  is_admin: false
})
</script>

<template>
  <form class="space-y-4 rounded-md border border-gray-200 bg-white p-4">
    <div class="flex items-center gap-3">
      <label for="user_code" class="text-sm font-medium text-gray-700 min-w-32">
        User Code
      </label>
      <input
        id="user_code"
        v-model="form.user_code"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="full_name" class="text-sm font-medium text-gray-700 min-w-32">
        Full Name
      </label>
      <input
        id="full_name"
        v-model="form.full_name"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="email" class="text-sm font-medium text-gray-700 min-w-32">
        Email
      </label>
      <input
        id="email"
        v-model="form.email"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="phone_number" class="text-sm font-medium text-gray-700 min-w-32">
        Phone Number
      </label>
      <input
        id="phone_number"
        v-model="form.phone_number"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="is_active" class="text-sm font-medium text-gray-700 min-w-32">
        Is Active
      </label>
      <input
        id="is_active"
        v-model="form.is_active"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
    <div class="flex items-center gap-3">
      <label for="is_admin" class="text-sm font-medium text-gray-700 min-w-32">
        Is Admin
      </label>
      <input
        id="is_admin"
        v-model="form.is_admin"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </div>
  </form>
</template>
