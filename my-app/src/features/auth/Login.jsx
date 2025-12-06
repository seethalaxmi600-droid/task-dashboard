import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Minimum 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const login = async ({ email, password }) => {
    
    
    try {
      setLoading(true);
      setLoginError("");

      // Example API call
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",res.data.user.is_admin );
      localStorage.setItem("user_login_name",res.data.user.name );
      localStorage.setItem("user_login_id",res.data.user.id);
      // localStorage.setItem("user", JSON.stringify(userData));
      // localStorage.setItem("user_data",res.data.user );
      console.log(res.data.user.id);
      console.log("User Logged In:", { email, password });
      alert("Login Successful!");
      if (res.data.user.is_admin === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    
    } catch (error) {
      console.error(error);
      setLoginError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data, e) => {
  e.preventDefault();
  console.log("Form Submitted:", data);
  login(data);
};

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {loginError && <div className="text-danger mt-2">{loginError}</div>}
      </div>
    </div>
  );
};

export default Login;
