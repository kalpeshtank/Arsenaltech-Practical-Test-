<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carts extends Model {

    /**
     *
     * @var type 
     */
    protected $fillable = [
        'user_id', 'product_id', 'name', 'price', 'quantity', 'image', 'slug'
    ];

}
