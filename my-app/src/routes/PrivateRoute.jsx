import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem("user");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin !== "1") {
    return children;
  }

  return <Navigate to="/" replace />;
}