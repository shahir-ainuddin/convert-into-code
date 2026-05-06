const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const generatorDir = __dirname
const templatesDir = path.join(generatorDir, 'templates')
const specPath = path.join(generatorDir, 'spec.json')
const outputDir = path.join(generatorDir, '..', 'resources', 'js', 'components', 'generated')
const pagesDir = path.join(generatorDir, '..', 'resources', 'js', 'pages', 'generated')
const routerDir = path.join(generatorDir, '..', 'resources', 'js', 'router')
const generatedRoutesPath = path.join(routerDir, 'generated-routes.ts')

function readJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function validateSpec(spec) {
  if (!spec || typeof spec !== 'object') throw new Error('Spec must be a valid JSON object')
  if (!spec.name || typeof spec.name !== 'string') throw new Error('Spec "name" is required and must be a string')
  if (!Array.isArray(spec.fields) || spec.fields.length === 0) throw new Error('Spec "fields" must be a non-empty array')

  spec.fields.forEach((field, index) => {
    if (!field.name || !field.label || !field.type) {
      throw new Error(`Field at index ${index} must include name, label, and type`)
    }
    if (!['text', 'checkbox'].includes(field.type)) {
      throw new Error(`Unsupported field type "${field.type}" at index ${index}`)
    }
  })
}

function renderTemplate(templateName, data) {
  const templatePath = path.join(templatesDir, templateName)
  const templateContent = fs.readFileSync(templatePath, 'utf-8')
  return ejs.render(templateContent, data)
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf-8')
}

function getGeneratedNames() {
  if (!fs.existsSync(outputDir)) return []
  return fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith('Form.vue'))
    .map((file) => file.replace(/Form\.vue$/, ''))
    .filter((name) => fs.existsSync(path.join(outputDir, `${name}Table.vue`)))
    .sort((a, b) => a.localeCompare(b))
}

function toRoutePath(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function generatePageFile(name) {
  const content = `<script setup lang="ts">
import ${name}Form from '../../components/generated/${name}Form.vue'
import ${name}Table from '../../components/generated/${name}Table.vue'

const rows: any[] = []
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">${name} Form</h2>
      <${name}Form />
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">${name} Table</h2>
      <${name}Table :rows="rows" />
    </section>
  </main>
</template>
`
  writeFile(path.join(pagesDir, `${name}Page.vue`), content)
}

function generateRoutesFile(names) {
  const routeItems = names
    .map(
      (name) => `  {
    name: '${name}',
    path: '/${toRoutePath(name)}',
    component: () => import('../pages/generated/${name}Page.vue')
  }`
    )
    .join(',\n')

  const routesContent = `import type { RouteRecordRaw } from 'vue-router'

export const generatedRoutes: RouteRecordRaw[] = [
${routeItems}
]
`
  writeFile(generatedRoutesPath, routesContent)
}

function syncGeneratedPagesAndRoutes() {
  ensureDir(pagesDir)
  ensureDir(routerDir)
  const names = getGeneratedNames()
  names.forEach((name) => generatePageFile(name))
  generateRoutesFile(names)
}

function generate() {
  const spec = readJson(specPath)
  validateSpec(spec)
  ensureDir(outputDir)

  const data = { componentName: spec.name, fields: spec.fields }
  writeFile(path.join(outputDir, `${spec.name}Form.vue`), renderTemplate('form.ejs', data))
  writeFile(path.join(outputDir, `${spec.name}Table.vue`), renderTemplate('table.ejs', data))
  syncGeneratedPagesAndRoutes()

  console.log(`Generated ${spec.name} files and updated routes`)
}

generate()
