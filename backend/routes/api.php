<?php

use Illuminate\Http\Request;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Headers:  *');
header('Access-Control-Allow-Methods:  *');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', 'CartController@products');
Route::post('/cart', 'CartController@cart');
Route::post('/add', 'CartController@add');
Route::post('/remove', 'CartController@remove');
Route::post('/clear', 'CartController@clear');
