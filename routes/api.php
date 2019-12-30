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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

 
Route::get('pizzas', 'PizzasController@index');
 
Route::get('pizzas/{pizza}', 'PizzasController@show');
 
Route::post('pizzas','PizzasController@store');
 
Route::put('pizzas/{pizza}','PizzasController@update');
 
Route::delete('pizzas/{pizza}', 'PizzasController@delete');
