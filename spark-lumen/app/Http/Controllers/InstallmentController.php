<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\Project;
use Illuminate\Http\Request;

class InstallmentController extends Controller
{
    public function getByProject(Request $request) {
        $project_id = $request->get("project_id");
        if ($project_id) {
            $project = Project::find($project_id);
            if (!$project) {
                return response(["status"=>"notFound"], 404);
            }
            $project = $project->with("installments")->first();
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
        $installment = new Installment();
        $installment->amount = $request->input("amount");
        $installment->project_id = $project_id;
        $installment->save();

        return [
            "status"=>"success",
            "installment"=>$installment
        ];
    }

    public function delete(Request $request, $id) {
        if (!$id || !$request->get('project_id')) return response(["status"=>"badData"], 400);
        $installment = Installment::find($id);
        if (!$installment) return response(["status"=>"notFound"], 404);
        $project = Project::find($request->get('project_id'));
        if ($project->user_id == $request->user()->id) {
            $installment->delete();
            return [
                "status" => "success",
                "can_delete" => ""
            ];
        }
        return response(["status" => "forbidden"], 403);
    }
}
