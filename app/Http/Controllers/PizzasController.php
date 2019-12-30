<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzasController extends Controller
{
   public function index()
    {
        return Pizza::all();
    }
 
    public function show(pizza $pizza)
    {
        return $pizza;
    }
 
    public function store(Request $request)
    {
        $this->validate($request, [
        'title' => 'required|unique:products|max:255',
        'image' =>'required',
        'description' => 'required',
        'price' => 'integer',
    ]);
        $pizza = Pizza::create($request->all());
 
        return response()->json($pizza, 201);
    }
   
 
    public function update(Request $request, pizza $pizza)
    {
        $pizza->update($request->all());
 
        return response()->json($pizza, 200);
    }
 
    public function delete(pizza $pizza)
    {
        $pizza->delete();
 
        return response()->json(null, 204);
    }
}
