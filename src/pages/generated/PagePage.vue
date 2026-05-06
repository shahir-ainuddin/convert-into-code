<script setup lang="ts">
import PageForm from '../../components/generated/PageForm.vue'
import PageTable from '../../components/generated/PageTable.vue'

const rows: any[] = []
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Page Form</h2>
      <PageForm />
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Page Table</h2>
      <PageTable :rows="rows" />
    </section>
  </main>
</template>
