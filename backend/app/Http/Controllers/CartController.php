<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class CartController extends Controller {

    public function shop() {
        $products = Product::all();
        foreach ($products as &$item) {
            $item->img_url = asset('storage/images/' . $item->image_path);
        }
        return sendSuccess($products, 'Success');
    }

    public function CartCount() {
        $cartCollection = [];
        $cartCollection['count'] = \Cart::getTotalQuantity();
        return sendSuccess($cartCollection, 'Success');
    }

    public function cart() {
        $cartCollection = \Cart::getContent();
        return sendSuccess($cartCollection, 'Success');
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
        $cartCollection['count'] = \Cart::getTotalQuantity();
        $cartCollection['cart'] = \Cart::getContent();
        return sendSuccess($cartCollection, 'Item is Added to Cart!');
    }

    public function remove(Request $request) {
        \Cart::remove($request->id);
        return sendSuccess([], 'Item is removed!');
    }

    public function update(Request $request) {
        \Cart::update($request->id,
                array(
                    'quantity' => array(
                        'relative' => false,
                        'value' => $request->quantity
                    ),
        ));
        return sendSuccess([], 'Cart is Updated!');
    }

    public function clear() {
        \Cart::clear();
        return sendSuccess([], 'Car is cleared!');
    }

}
