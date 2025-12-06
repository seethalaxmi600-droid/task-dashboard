<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use App\Models\Task;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreatedMail;
class AdminController extends Controller
{
    //
    public function createUser(Request $req)
    {
        // echo 'sdf';die;
        $user = User::create([
            // 'company_id' => auth()->user()->company_id,
            'name' => $req->uname,
            'email' => $req->uemail,
            // 'password' => bcrypt("123456")
            'password' => bcrypt($req->tempPassword)
        ]);
   // Mail::to($user->email)->send(new UserCreatedMail($user, $req->tempPassword));
        return response()->json($user);

    //   try {

    //     $user = new \stdClass();
    //     $user->name = "Test User";
    //     $user->email = "notificationmail43@gmail.com";

    //     $tempPassword = "user@123";

    //     Mail::to($user->email)->send(new UserCreatedMail($user, $tempPassword));

    //     return response()->json([
    //         "status" => "success",
    //         "message" => "Mail sent successfully!"
    //     ]);

    // } catch (\Exception $e) {

    //     return response()->json([
    //         "status" => "error",
    //         "message" => "Mail sending failed!",
    //         "error" => $e->getMessage()
    //     ]);
    // }
    }

    public function createTask(Request $req)
    {
        $task = Task::create([
            // 'company_id' => auth()->user()->company_id,
            'assigned_user_id' => $req->user_id,
            'title' => $req->title,
            'description' => $req->description,
            'priority' => $req->priority,
            'status' => $req->status,
            'assigned_user_id' => $req->assignedUser,
            'duedate' =>date('Y-m-d', strtotime($req->dueDate))
//  console.log(title);
//         console.log(description);
//         console.log(dueDate);
//         console.log(priority)
            
        ]);
        return response()->json($task);
    }

     public function userlist(Request $req)
    {
        $user_list=User::where('is_admin',0)->get();
        return response()->json($user_list);
    }
}
