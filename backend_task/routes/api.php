<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserTaskController;
use Illuminate\Support\Facades\Mail;
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

// Route::middleware('auth:api')->group(function () {

    // Admin
    Route::any('/admin/create-user',[AdminController::class,'createUser']);
    Route::any('/admin/userlist',[AdminController::class,'userlist']);
    Route::post('/admin/create-task',[AdminController::class,'createTask']);
    
    // User
    Route::get('/my-tasks/{assigned_user_id}',[UserTaskController::class,'myTasks']);
    Route::get('/allTasks',[UserTaskController::class,'allTasks']);
    Route::patch('/task/{id}/{status}',[UserTaskController::class,'updateStatus']);
    Route::any('/deleteTask/{id}',[UserTaskController::class,'deleteTask']);
    
// });
Route::get('/test-mail', function () {
    try {
        Mail::raw("This is a test email from Brevo SMTP!", function ($msg) {
            $msg->to("seethalaxmi600@gmail.com")
                ->subject("Brevo SMTP Working Test");
        });

        return ["status" => "success", "message" => "Mail sent successfully!"];
    } catch (\Exception $e) {
        return ["status" => "error", "message" => $e->getMessage()];
    }
});