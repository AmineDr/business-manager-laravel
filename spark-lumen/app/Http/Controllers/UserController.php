<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
            $user->api_token = base64_encode(random_bytes(30));// Generate a random token
            $user->save();

            return response()->json([
                'status' => 'success',
                'token' => $user->api_token,
            ]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
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
}
