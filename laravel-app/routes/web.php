<?php

use Illuminate\Support\Facades\Route;

// <generated-api-routes:start>
Route::get('/generated-api/pages', [\App\Http\Controllers\Generated\PageController::class, 'index']);
Route::post('/generated-api/pages', [\App\Http\Controllers\Generated\PageController::class, 'store']);
Route::get('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'index']);
Route::post('/generated-api/tests', [\App\Http\Controllers\Generated\TestController::class, 'store']);
Route::get('/generated-api/users', [\App\Http\Controllers\Generated\UserController::class, 'index']);
Route::post('/generated-api/users', [\App\Http\Controllers\Generated\UserController::class, 'store']);
// <generated-api-routes:end>

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
