<script setup lang="ts">
import UserForm from '../../components/generated/UserForm.vue'
import UserTable from '../../components/generated/UserTable.vue'

const rows: any[] = []
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">User Form</h2>
      <UserForm />
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">User Table</h2>
      <UserTable :rows="rows" />
    </section>
  </main>
</template>
