import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  // Validation schema
   const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get("/admin/userlist");
        console.log(res.data);

        setUsers(res.data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    }

    fetchUsers();
  }, []);
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Task Title is required")
      .min(3, "Minimum 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Minimum 5 characters"),
    dueDate: Yup.date()
      .required("Due Date is required")
      .min(new Date(), "Due Date cannot be in the past"),
    priority: Yup.string()
      .required("Priority is required")
      .oneOf(["Low", "Medium", "High"], "Invalid priority"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["Pending", "In Progress", "Completed"], "Invalid status"),
    assignedUser: Yup.string().required("Assigned User is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  
  const CreateTaskApi = async ({ title,description,dueDate,priority,status,assignedUser
 }) => {
    try {
      setLoading(true);
      setLoginError("");
        // console.log(title);
        // console.log(description);
        // console.log(dueDate);
        // console.log(priority);return false;
      const res = await api.post("/admin/create-task", {
       title,description,dueDate,priority,status,assignedUser
      });

      console.log(res.data);
      alert("Task created successfully!");
    //   reset();

    } catch (error) {
      console.error(error);
      setLoginError(error.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (data) => {
    console.log("Task Data:", data);
    CreateTaskApi(data);

    // reset(); // clear form after submit
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create Task</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title")}
            />
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              {...register("description")}
            />
            <div className="invalid-feedback">
              {errors.description?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
              {...register("dueDate")}
            />
            <div className="invalid-feedback">{errors.dueDate?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className={`form-select ${errors.priority ? "is-invalid" : ""}`}
              {...register("priority")}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="invalid-feedback">{errors.priority?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              {...register("status")}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="invalid-feedback">{errors.status?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Assigned User</label>
            <select
              className={`form-select ${
                errors.assignedUser ? "is-invalid" : ""
              }`}
              {...register("assignedUser")}
            >
              <option value="">Select User</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} 
                </option>
              ))}
            </select>

            <div className="invalid-feedback">
              {errors.assignedUser?.message}
            </div>
          </div>

          <button className="btn btn-primary w-100" type="submit"   disabled={loading}>
            Create Task

          </button>
        </form>
        
      </div>
    </div>
  );
};

export default CreateTask;