import { useSelector } from "react-redux";
import { selectAuthenticatedUser, selectIsLoading } from "../redux/authSlice";

export const useAuth = () => {
  const user = useSelector(selectAuthenticatedUser);
  const isLoading = useSelector(selectIsLoading);

  return { user, isLoading };
};
