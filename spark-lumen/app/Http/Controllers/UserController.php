<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required:min8',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user->api_token = $this->genToken();
            $user->last_login = DB::raw('CURRENT_TIMESTAMP');
            $user->save();

            return response()->json([
                'status' => 'success',
                'token' => $user->api_token,
            ]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function register(Request $request) {
        $this->validate($request, [
            'firstname'=>'required|min:3',
            'lastname'=>'required|min:3',
            'email' => 'required|email',
            'password' => 'required:min8'
        ]);

        if (User::where('email', $request->input('email'))->first()) {
            return response(["status" => "emailExists"], 403);
        }

        $user = new User();
        $user->firstname = $request->input("firstname");
        $user->lastname = $request->input("lastname");
        $user->email = $request->input("email");
        $user->password = Hash::make($request->input("password"));
        $user->api_token = $this->genToken();
        $user->save();

        return [
          "status"=>"success",
          "userInfo"=>$user,
          "api_token"=>$user->api_token
        ];
    }

    public function getAuthenticatedUser(Request $request) {
        $user = $request->user();

        if (!$user) {
            return response()->json(['status' => 'Unauthorized | Controller'], 401);
        }

        return response()->json([
            "status" => "success",
            "userInfo" => $user
        ]);
    }

    public function getStats(Request $request) {
        $user = $request->user();
        $projects = $user->projects();
        $customers = $user->customers();

        return [
            "status"=>"success",
            "stats"=>[
                "customers"=>[
                    "count"=>$customers->count()
                ],
                "projects"=>[
                    "count"=>$projects->count(),
                    "total"=>$projects->sum('amount')
                ]
            ]
        ];
    }

    public function genToken() {
        return base64_encode(random_bytes(30));
    }
}
