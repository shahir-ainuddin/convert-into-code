<?php

namespace App\Http\Controllers\Generated;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class ModuleManagerController extends Controller
{
    public function destroy(string $name): JsonResponse
    {
        if (!preg_match('/^[A-Z][A-Za-z0-9]*$/', $name)) {
            return response()->json(['message' => 'Invalid module name'], 422);
        }

        $table = Str::of($name)->snake()->plural()->toString();

        Schema::dropIfExists($table);

        $paths = [
            resource_path("js/components/generated/{$name}Form.vue"),
            resource_path("js/components/generated/{$name}Table.vue"),
            resource_path("js/pages/generated/{$name}Page.vue"),
            app_path("Http/Controllers/Generated/{$name}Controller.php"),
            database_path("seeders/{$name}Seeder.php"),
        ];

        foreach ($paths as $path) {
            if (File::exists($path)) {
                File::delete($path);
            }
        }

        foreach (glob(database_path("migrations/*_create_{$table}_table.php")) as $migrationFile) {
            if ($migrationFile && File::exists($migrationFile)) {
                File::delete($migrationFile);
            }
        }

        $databaseSeederPath = database_path('seeders/DatabaseSeeder.php');
        if (File::exists($databaseSeederPath)) {
            $seederClass = "{$name}Seeder";
            $seederContent = File::get($databaseSeederPath);
            $seederContent = str_replace("use Database\\Seeders\\{$seederClass};\n", '', $seederContent);
            $seederContent = str_replace('        $this->call(' . $seederClass . '::class);' . "\n", '', $seederContent);
            File::put($databaseSeederPath, $seederContent);
        }

        $this->syncGeneratedRoutesAndPages();
        $this->syncWebGeneratedApiRoutes();

        return response()->json(['message' => "Module {$name} deleted"]);
    }

    private function syncGeneratedRoutesAndPages(): void
    {
        $componentDir = resource_path('js/components/generated');
        $names = [];

        if (File::isDirectory($componentDir)) {
            foreach (File::files($componentDir) as $file) {
                $filename = $file->getFilename();
                if (!str_ends_with($filename, 'Form.vue')) {
                    continue;
                }

                $name = str_replace('Form.vue', '', $filename);
                if (File::exists("{$componentDir}/{$name}Table.vue")) {
                    $names[] = $name;
                }
            }
        }

        sort($names);

        $routeItems = array_map(function (string $name): string {
            $path = Str::of($name)->snake()->replace('_', '-')->toString();
            return "  {\n    name: '{$name}',\n    path: '/{$path}',\n    component: () => import('../pages/generated/{$name}Page.vue')\n  }";
        }, $names);

        $routesContent = "import type { RouteRecordRaw } from 'vue-router'\n\nexport const generatedRoutes: RouteRecordRaw[] = [\n" . implode(",\n", $routeItems) . "\n]\n";
        File::put(resource_path('js/router/generated-routes.ts'), $routesContent);
    }

    private function syncWebGeneratedApiRoutes(): void
    {
        $webRoutesPath = base_path('routes/web.php');
        if (!File::exists($webRoutesPath)) {
            return;
        }

        $controllerDir = app_path('Http/Controllers/Generated');
        $routes = [
            "Route::delete('/generated-api/modules/{name}', [\App\Http\Controllers\Generated\ModuleManagerController::class, 'destroy']);",
        ];

        if (File::isDirectory($controllerDir)) {
            foreach (File::files($controllerDir) as $file) {
                $filename = $file->getFilename();
                if ($filename === 'ModuleManagerController.php' || !str_ends_with($filename, 'Controller.php')) {
                    continue;
                }

                $name = str_replace('Controller.php', '', $filename);
                $table = Str::of($name)->snake()->plural()->toString();
                $controllerFqn = "\\App\\Http\\Controllers\\Generated\\{$name}Controller::class";
                $routes[] = "Route::get('/generated-api/{$table}', [{$controllerFqn}, 'index']);";
                $routes[] = "Route::post('/generated-api/{$table}', [{$controllerFqn}, 'store']);";
                $routes[] = "Route::put('/generated-api/{$table}/{id}', [{$controllerFqn}, 'update']);";
            }
        }

        $startMarker = '// <generated-api-routes:start>';
        $endMarker = '// <generated-api-routes:end>';
        $replacement = $startMarker . "\n" . implode("\n", $routes) . "\n" . $endMarker;

        $content = File::get($webRoutesPath);
        $startPos = strpos($content, $startMarker);
        $endPos = strpos($content, $endMarker);

        if ($startPos !== false && $endPos !== false && $endPos > $startPos) {
            $before = substr($content, 0, $startPos);
            $after = substr($content, $endPos + strlen($endMarker));
            $content = $before . $replacement . $after;
        } else {
            $content = str_replace("use Illuminate\\Support\\Facades\\Route;\n", "use Illuminate\\Support\\Facades\\Route;\n\n{$replacement}\n", $content);
        }

        File::put($webRoutesPath, $content);
    }
}
