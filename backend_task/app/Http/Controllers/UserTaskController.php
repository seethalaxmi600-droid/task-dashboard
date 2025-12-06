<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use App\Models\Task;
use DB;
class UserTaskController extends Controller
{
    //
      public function myTasks($assigned_user_id)
    {
        // return Task::where('assigned_user_id', auth()->id())->get();
         $task=Task::where('assigned_user_id',$assigned_user_id)->get();
         return response()->json($task);
    }

    public function updateStatus($id,$status)
    {
        $task = Task::find($id);
        // $task->status = request('status');
        $task->status = $status;
        $task->save();

        return response()->json($task);
    }
    public function allTasks()
    {
        $task = DB::table('tasks')
        ->join('users','users.id','tasks.assigned_user_id')
        ->select('users.id as user_id','tasks.id','tasks.title','tasks.description','users.name as user_name','tasks.priority','tasks.duedate','tasks.status')
        ->get();
        
        return response()->json($task);
        //notificationmail43@gmail.com
    }
    public function deleteTask($id)
    {
        // echo $id;die;
        $task = Task::findOrFail($id)->delete();
        

        return response()->json($task);
    }

}
