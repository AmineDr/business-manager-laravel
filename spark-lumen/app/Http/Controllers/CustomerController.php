<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function get(Request $request) {
        $customers = Customer::withCount('projects')->where('user_id', $request->user()->id)->get();
        if (!$customers) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        return response([
            "status"=>"success",
            "customers"=>$customers
        ]);
    }

    public function getId(Request $request, $id) {
        $customer = Customer::with('projects')->where('user_id', $request->user()->id)->find($id);
        if (!$customer) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        return response([
            "status"=>"success",
            "customer"=> $customer,
        ]);
    }

    public function add(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required',
        ]);

        $customer = new Customer($request->all());
        $customer->user_id = $request->user()->id;
        $customer->save();

        return [
            "status"=>"success",
            "request"=>$customer
        ];
    }

    public function delete($id) {
        $customer = Customer::where("id", $id)->first();
        if (!$customer) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        $customer->delete();
        return response([
            "status"=>"success",
            "info"=>"deleted"
        ]);
    }
}
