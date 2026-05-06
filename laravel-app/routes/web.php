<?php

use Illuminate\Support\Facades\Route;

// <generated-api-routes:start>
Route::delete('/generated-api/modules/{name}', [\App\Http\Controllers\Generated\ModuleManagerController::class, 'destroy']);
Route::get('/generated-api/files', [\App\Http\Controllers\Generated\FileController::class, 'index']);
Route::post('/generated-api/files', [\App\Http\Controllers\Generated\FileController::class, 'store']);
Route::put('/generated-api/files/{id}', [\App\Http\Controllers\Generated\FileController::class, 'update']);
Route::get('/generated-api/images', [\App\Http\Controllers\Generated\ImageController::class, 'index']);
Route::post('/generated-api/images', [\App\Http\Controllers\Generated\ImageController::class, 'store']);
Route::put('/generated-api/images/{id}', [\App\Http\Controllers\Generated\ImageController::class, 'update']);
// <generated-api-routes:end>

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
