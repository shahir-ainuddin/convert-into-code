<?php

use Illuminate\Support\Facades\Route;

// <generated-api-routes:start>
Route::delete('/generated-api/modules/{name}', [\App\Http\Controllers\Generated\ModuleManagerController::class, 'destroy']);
Route::get('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'index']);
Route::post('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'store']);
Route::put('/generated-api/tests/{id}', [\App\Http\Controllers\Generated\TestController::class, 'update']);
// <generated-api-routes:end>

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
