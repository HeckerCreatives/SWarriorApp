import { jwtDecode } from "jwt-decode";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const auth = localStorage.getItem("auth")
    ? jwtDecode(localStorage.getItem("auth"))
    : "";
  const location = useLocation();

  if (auth === "")
    return <Navigate to="/login" state={{ from: location }} replace />;

  return allowedRoles.includes(auth.roleName.toLowerCase()) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
