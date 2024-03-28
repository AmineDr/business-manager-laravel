<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function get(Request $request) {
        $projects = Project::with("customer")->where('user_id', $request->user()->id)->get();
        if (!$projects) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        return response([
            "status"=>"success",
            "projects"=>$projects
        ]);
    }

    public function getId(Request $request, $id) {
        $project = Project::find($id)->where('user_id', $request->user()->id)->with("customer")->with("installments")->with("expenses")->first();
        if (!$project) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        return response([
            "status"=>"success",
            "project"=>$project
        ]);
    }

    public function add(Request $request) {
        $this->validate($request, [
            "name"=>"required",
            "amount"=>"required",
            "existing_customer"=>"required"
        ]);

        $project = new Project();
        $project->name = $request->input("name");
        $project->amount = $request->input("amount");
        $project->user_id = $request->user()->id;

        if ($request->input("existing_customer") == "true") {
            $project->customer_id = $request->input('customer');
            $project->save();
            return [
                "status"=>"success",
                "project"=> $project
            ];
        }

        $customer = new Customer([
            "name"=>$request->input("name"),
            "phone"=>"",
            "user_id"=>$request->user()->id
        ]);
        $customer->save();
        $project->customer_id = $customer->id;

        $customer->save();
        $project->save();

        return [
            "status"=>"success",
            "project"=>$project
        ];
    }

    public function delete(Request $request, $id) {
        $project = Project::find($id)->where('user_id', $request->user()->id)->first();
        if (!$project) {
            return response([
                "status"=>"notFound"
            ], 404);
        }
        $project->delete();
        return response([
            "status"=>"success",
            "info"=>"deleted"
        ]);
    }
}
