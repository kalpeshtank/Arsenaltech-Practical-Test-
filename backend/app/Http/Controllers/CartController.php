<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Carts;

class CartController extends Controller {

    public function products() {
        $products = Product::all();
        foreach ($products as &$item) {
            $item->img_url = asset('storage/images/' . $item->image_path);
        }
        return sendSuccess($products, 'Success');
    }

    public function cart(Request $request) {
        $cartCollection = Carts::where(['user_id' => $request->user_id])->get();
        foreach ($cartCollection as &$item) {
            $item->img_url = asset('storage/images/' . $item->image);
        }
        return sendSuccess($cartCollection, 'Success');
    }

    public function add(Request $request) {
        $cart_data = Carts::where(['product_id' => $request->id, 'user_id' => $request->user_id])->first();
        Carts::updateOrCreate(['id' => @$cart_data->id], [
            'product_id' => $request->id,
            'user_id' => $request->user_id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'image' => isset($request->image) ? $request->image : $request->image_path,
            'slug' => $request->slug
        ]);
        if ($request->is_updtae) {
            return sendSuccess([], 'Item Quantity Updated Success!');
        } else {
            return sendSuccess([], 'Item is Added to Cart!');
        }
    }

    public function remove(Request $request) {
        Carts::where('user_id', $request->user_id)->where('product_id', $request->id)->delete();
        return sendSuccess([], 'Item is removed!');
    }

    public function clear(Request $request) {
        Carts::where('user_id', $request->user_id)->delete();
        return sendSuccess([], 'Cart is cleared!');
    }

}
