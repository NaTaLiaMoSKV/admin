import { useAuth } from "hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

export default ProtectedRoute;
