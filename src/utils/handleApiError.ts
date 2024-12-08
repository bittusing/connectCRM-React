import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LocalStorage } from "../utils/localStorage";

export const handleApiError = (
  error: unknown,
  navigatePath?: string
): { error: string } => {
  const axiosError = error as AxiosError<{ message: string }>;

  console.error(axiosError);

  if (axiosError.response?.status === 401) {
    console.error("Error 401: Unauthorized");
    toast.error("Error 401: Unauthorized");
    // LocalStorage.ClearStorage();
    // window.location.href = "/login";
  }

  if (navigatePath) {
    window.location.href = "/" + navigatePath;
  }

  const errorMessage =
    axiosError.response?.data?.message ||
    axiosError.message ||
    "An unexpected error occurred";
  toast.error(errorMessage);

  return { error: errorMessage };
};
