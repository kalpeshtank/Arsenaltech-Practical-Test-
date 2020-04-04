<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Illuminate\Http\Response;
use Illuminate\Http\Request;

function sendSuccess($data = [], $message = "") {
    return response()->json(['status' => 200, 'data' => $data, 'message' => $message]);
    exit;
}

function sendError($data = [], $message = "") {
    return response()->json(['status' => 500, 'data' => $data, 'message' => $message]);
    exit;
}
