<script setup lang="ts">
import ScreenForm from '../../components/generated/ScreenForm.vue'
import ScreenTable from '../../components/generated/ScreenTable.vue'

const rows: any[] = []
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Screen Form</h2>
      <ScreenForm />
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">Screen Table</h2>
      <ScreenTable :rows="rows" />
    </section>
  </main>
</template>
