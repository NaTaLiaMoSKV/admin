import { toast } from "react-toastify";

export const handleError = (err) => {
  console.error(err);
  toast.error("Error occured!");
};
