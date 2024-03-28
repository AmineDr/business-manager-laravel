<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Installment;
use App\Models\Project;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function getByProject(Request $request) {
        $project_id = $request->get("project_id");
        if ($project_id) {
            $project = Project::find($project_id);
            if (!$project) {
                return response(["status"=>"notFound"], 404);
            }
            $project = $project->with("expenses")->first();
            return [
                "status"=>"success",
                "project"=>$project
            ];
        }
        return response(["status"=>"BadData"], 400);
    }

    public function add(Request $request) {
        $project_id = $request->get("project_id");
        if (!$project_id) {
            return response(["status"=>"BadData"], 400);
        }
        $project = Project::find($project_id);
        if (!$project) {
            return response(["status"=>"notFound"], 404);
        }
        $expense = new Expense();
        $expense->amount = $request->input("amount");
        $expense->project_id = $project_id;
        $expense->save();

        return [
            "status"=>"success",
            "expense"=>$expense
        ];
    }

    public function delete(Request $request, $id) {
        if (!$id || !$request->get('project_id')) return response(["status"=>"badData"], 400);
        $expense = Expense::find($id);
        if (!$expense) return response(["status"=>"notFound"], 404);
        $project = Project::find($request->get('project_id'));
        if ($project->user_id == $request->user()->id) {
            $expense->delete();
            return [
                "status" => "success"
            ];
        }
        return response(["status" => "forbidden"], 403);
    }
}

