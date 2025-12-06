import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    uname: Yup.string().required("Name is required").min(3),
    uemail: Yup.string().required("Email is required").email(),
    tempPassword: Yup.string().required("Temporary password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const createUserApi = async ({ uname, uemail, tempPassword }) => {
    try {
      setLoading(true);
      setLoginError("");

      const res = await api.post("/admin/create-user", {
        uname,
        uemail,
        tempPassword,
      });

      console.log(res.data);
      alert("User created successfully!");
      reset();

    } catch (error) {
      console.error(error);
      setLoginError(error.response?.data?.message || "Error creating user");
    } finally {
      setLoading(false);
    }
  };


  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    createUserApi(data);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create User</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.uname ? "is-invalid" : ""}`}
              {...register("uname")}
            />
            <div className="invalid-feedback">{errors.uname?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.uemail ? "is-invalid" : ""}`}
              {...register("uemail")}
            />
            <div className="invalid-feedback">{errors.uemail?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Temporary Password</label>
            <input
              type="password"
              className={`form-control ${errors.tempPassword ? "is-invalid" : ""}`}
              {...register("tempPassword")}
            />
            <div className="invalid-feedback">{errors.tempPassword?.message}</div>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>

          {loginError && <p className="text-danger mt-2">{loginError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
