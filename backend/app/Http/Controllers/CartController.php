<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class CartController extends Controller {

    public function shop() {
        $products = Product::all();
        sendSuccess($products, 'Success');
    }

    public function cart() {
        $cartCollection = \Cart::getContent();
        sendSuccess($cartCollection, 'Success');
    }

    public function add(Request$request) {
        \Cart::add(array(
            'id' => $request->id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'attributes' => array(
                'image' => $request->img,
                'slug' => $request->slug
            )
        ));
        sendSuccess([], 'Item is Added to Cart!');
    }

    public function remove(Request $request) {
        \Cart::remove($request->id);
        sendSuccess([], 'Item is removed!');
    }

    public function update(Request $request) {
        \Cart::update($request->id,
                array(
                    'quantity' => array(
                        'relative' => false,
                        'value' => $request->quantity
                    ),
        ));
        sendSuccess([], 'Cart is Updated!');
    }

    public function clear() {
        \Cart::clear();
        sendSuccess([], 'Car is cleared!');
    }

}
