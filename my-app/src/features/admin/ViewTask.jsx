import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadAllTasks();
  }, []);

  
  const loadAllTasks = async () => {
    try {
      const res = await api.get("/allTasks");
      setTasks(res.data || []);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

 
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/deleteTask/${taskId}`);

      loadAllTasks();
      setTasks((prev) => prev.filter((t) => t._id !== taskId));

    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Error deleting task!");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">All Tasks</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned User</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th> 
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.user_name || "N/A"}</td>
                <td>{new Date(task.duedate).toLocaleDateString()}</td>
                <td>{task.priority}</td>

                <td>
                  <span
                    className={`badge ${
                      task.status === "Completed"
                        ? "bg-success"
                        : task.status === "In Progress"
                        ? "bg-primary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}