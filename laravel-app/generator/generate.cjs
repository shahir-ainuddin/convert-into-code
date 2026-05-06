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
const webRoutesPath = path.join(generatorDir, '..', 'routes', 'web.php')
const migrationsDir = path.join(generatorDir, '..', 'database', 'migrations')
const seedersDir = path.join(generatorDir, '..', 'database', 'seeders')
const databaseSeederPath = path.join(seedersDir, 'DatabaseSeeder.php')
const controllersDir = path.join(generatorDir, '..', 'app', 'Http', 'Controllers', 'Generated')

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

function toSnakeCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

function pluralize(value) {
  if (value.endsWith('y') && !/[aeiou]y$/.test(value)) return `${value.slice(0, -1)}ies`
  if (/(s|x|z|ch|sh)$/.test(value)) return `${value}es`
  return `${value}s`
}

function getTableName(componentName) {
  return pluralize(toSnakeCase(componentName))
}

function buildMigrationColumn(field) {
  if (field.type === 'checkbox') {
    return `            $table->boolean('${field.name}')->default(false);`
  }
  return `            $table->string('${field.name}')->nullable();`
}

function toMigrationClassName(componentName) {
  return `Create${pluralize(componentName)}Table`
}

function timestampForMigrationFile(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0')
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('_')
}

function getMigrationFilePath(tableName) {
  ensureDir(migrationsDir)
  const suffix = `_create_${tableName}_table.php`
  const existing = fs
    .readdirSync(migrationsDir)
    .find((file) => file.endsWith(suffix))

  if (existing) {
    return path.join(migrationsDir, existing)
  }

  return path.join(migrationsDir, `${timestampForMigrationFile()}${suffix}`)
}

function generateMigrationFile(spec) {
  const tableName = getTableName(spec.name)
  const migrationClassName = toMigrationClassName(spec.name)
  const columns = spec.fields.map((field) => buildMigrationColumn(field)).join('\n')
  const migrationContent = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('${tableName}', function (Blueprint $table): void {
            $table->id();
${columns}
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('${tableName}');
    }
};
`

  writeFile(getMigrationFilePath(tableName), migrationContent)
}

function buildSeederValue(field) {
  if (field.type === 'checkbox') return 'false'
  return `'Sample ${field.label}'`
}

function generateSeederFile(spec) {
  ensureDir(seedersDir)
  const seederClassName = `${spec.name}Seeder`
  const tableName = getTableName(spec.name)
  const values = spec.fields
    .map((field) => `                '${field.name}' => ${buildSeederValue(field)},`)
    .join('\n')

  const content = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Console\\Seeds\\WithoutModelEvents;
use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ${seederClassName} extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('${tableName}')->insert([
${values}
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
`

  writeFile(path.join(seedersDir, `${seederClassName}.php`), content)
}

function updateDatabaseSeeder(spec) {
  if (!fs.existsSync(databaseSeederPath)) return

  const seederClassName = `${spec.name}Seeder`
  const callLine = `        $this->call(${seederClassName}::class);`
  let content = fs.readFileSync(databaseSeederPath, 'utf-8')
  let changed = false

  const importLine = `use Database\\Seeders\\${seederClassName};`
  if (!content.includes(importLine)) {
    content = content.replace(
      'use Illuminate\\Database\\Seeder;',
      `use Illuminate\\Database\\Seeder;\n${importLine}`
    )
    changed = true
  }

  if (!content.includes(callLine)) {
    content = content.replace('    public function run(): void\n    {\n', `    public function run(): void\n    {\n${callLine}\n`)
    changed = true
  }

  if (changed) writeFile(databaseSeederPath, content)
}

function generatePageFile(name) {
  const tableName = getTableName(name)
  const content = `<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ${name}Form from '../../components/generated/${name}Form.vue'
import ${name}Table from '../../components/generated/${name}Table.vue'

const rows = ref<any[]>([])
const editingId = ref<number | null>(null)
const formModel = ref<Record<string, unknown> | null>(null)
const errorMessage = ref('')
const isSaving = ref(false)

async function loadRows() {
  const response = await fetch('/generated-api/${tableName}', {
    credentials: 'same-origin'
  })
  if (!response.ok) {
    errorMessage.value = 'Failed to load data from database.'
    return
  }
  errorMessage.value = ''
  rows.value = await response.json()
}

async function onSubmit(payload: Record<string, unknown>) {
  isSaving.value = true
  errorMessage.value = ''
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
  try {
    const isEditing = editingId.value !== null
    const targetUrl = isEditing
      ? \`/generated-api/${tableName}/\${editingId.value}\`
      : '/generated-api/${tableName}'
    const response = await fetch(targetUrl, {
      method: isEditing ? 'PUT' : 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      errorMessage.value = 'Save failed. Please check backend route/migration and try again.'
      return
    }

    editingId.value = null
    formModel.value = null
    await loadRows()
  } catch (error) {
    errorMessage.value = 'Save failed due to network/server error.'
  } finally {
    isSaving.value = false
  }
}

function onEdit(row: Record<string, unknown>) {
  editingId.value = Number(row.id)
  formModel.value = { ...row }
}

onMounted(loadRows)
</script>

<template>
  <main class="space-y-6">
    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">${name} Form</h2>
      <${name}Form :model-value="formModel" :submit-label="editingId ? 'Update' : 'Save'" @submit="onSubmit" />
      <p v-if="isSaving" class="mt-2 text-sm text-slate-600">Saving...</p>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
    </section>

    <section>
      <h2 class="mb-3 text-xl font-semibold text-slate-800">${name} Table</h2>
      <${name}Table :rows="rows" @edit="onEdit" />
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

function generateControllerFile(spec) {
  ensureDir(controllersDir)
  const tableName = getTableName(spec.name)
  const controllerName = `${spec.name}Controller`
  const validationRules = spec.fields
    .map((field) => {
      const rule = field.type === 'checkbox' ? 'boolean' : 'nullable|string'
      return `            '${field.name}' => '${rule}',`
    })
    .join('\n')

  const content = `<?php

namespace App\\Http\\Controllers\\Generated;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class ${controllerName} extends Controller
{
    private const TABLE = '${tableName}';

    public function index(): JsonResponse
    {
        return response()->json(
            DB::table(self::TABLE)
                ->orderByDesc('id')
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
${validationRules}
        ]);

        $id = DB::table(self::TABLE)->insertGetId(array_merge($data, [
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json(['id' => $id], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
${validationRules}
        ]);

        DB::table(self::TABLE)
            ->where('id', $id)
            ->update(array_merge($data, [
                'updated_at' => now(),
            ]));

        return response()->json(['id' => $id]);
    }
}
`
  writeFile(path.join(controllersDir, `${controllerName}.php`), content)
}

function syncGeneratedBackendRoutes() {
  if (!fs.existsSync(webRoutesPath)) return
  const names = getGeneratedNames()
  const routesBlock = names
    .map((name) => {
      const controllerPath = path.join(controllersDir, `${name}Controller.php`)
      if (!fs.existsSync(controllerPath)) return null
      const tableName = getTableName(name)
      const controllerFqn = `\\App\\Http\\Controllers\\Generated\\${name}Controller::class`
      return `Route::get('/generated-api/${tableName}', [${controllerFqn}, 'index']);\nRoute::post('/generated-api/${tableName}', [${controllerFqn}, 'store']);\nRoute::put('/generated-api/${tableName}/{id}', [${controllerFqn}, 'update']);`
    })
    .filter(Boolean)
    .join('\n')

  const startMarker = '// <generated-api-routes:start>'
  const endMarker = '// <generated-api-routes:end>'
  const replacement = `${startMarker}\n${routesBlock}\n${endMarker}`

  let content = fs.readFileSync(webRoutesPath, 'utf-8')
  const startIndex = content.indexOf(startMarker)
  const endIndex = content.indexOf(endMarker)

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const before = content.slice(0, startIndex)
    const after = content.slice(endIndex + endMarker.length)
    content = `${before}${replacement}${after}`
  } else {
    content = content.replace("use Illuminate\\Support\\Facades\\Route;\n", "use Illuminate\\Support\\Facades\\Route;\n\n" + replacement + "\n")
  }

  writeFile(webRoutesPath, content)
}

function generate() {
  const spec = readJson(specPath)
  validateSpec(spec)
  ensureDir(outputDir)

  const data = { componentName: spec.name, fields: spec.fields }
  writeFile(path.join(outputDir, `${spec.name}Form.vue`), renderTemplate('form.ejs', data))
  writeFile(path.join(outputDir, `${spec.name}Table.vue`), renderTemplate('table.ejs', data))
  generateMigrationFile(spec)
  generateSeederFile(spec)
  generateControllerFile(spec)
  updateDatabaseSeeder(spec)
  syncGeneratedPagesAndRoutes()
  syncGeneratedBackendRoutes()

  console.log(`Generated ${spec.name} UI, DB, controller, and routes`)
}

generate()
