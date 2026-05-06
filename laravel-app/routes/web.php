<?php

use Illuminate\Support\Facades\Route;

// <generated-api-routes:start>
Route::get('/generated-api/pages', [\App\Http\Controllers\Generated\PageController::class, 'index']);
Route::post('/generated-api/pages', [\App\Http\Controllers\Generated\PageController::class, 'store']);
Route::put('/generated-api/pages/{id}', [\App\Http\Controllers\Generated\PageController::class, 'update']);
Route::get('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'index']);
Route::post('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'store']);
Route::put('/generated-api/tests/{id}', [\App\Http\Controllers\Generated\TestController::class, 'update']);
Route::get('/generated-api/users', [\App\Http\Controllers\Generated\UserController::class, 'index']);
Route::post('/generated-api/users', [\App\Http\Controllers\Generated\UserController::class, 'store']);
Route::put('/generated-api/users/{id}', [\App\Http\Controllers\Generated\UserController::class, 'update']);
// <generated-api-routes:end>

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
