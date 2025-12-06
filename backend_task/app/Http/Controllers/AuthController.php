<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
      public function register(Request $req)
    {
        $company = Company::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => bcrypt($req->password)
        ]);

        $admin = User::create([
            'company_id' => $company->id,
            'name' => $req->name,
            'email' => $req->email,
            'password' => bcrypt($req->password),
            'is_admin' => true
        ]);

        return response()->json(['message' => 'Company Registered', 'company' => $company]);
    }

   public function login(Request $req)
{
    if(isset($req->email)&&isset($req->password) )
    {
    if (!auth()->attempt($req->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
// if(isset($req->uemail)&&isset($req->tempPassword) )
//     {
//     if (!auth()->attempt($req->only('uemail', 'tempPassword'))) {
//         return response()->json(['message' => 'Invalid credentials'], 401);
//     }
// }
    $user = auth()->user();

    // Generate token
    $token = \Str::random(60);

    // Save token into correct column
    $user->update(['api_token' => $token]);

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
}


}
