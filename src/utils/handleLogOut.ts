import { toast } from "react-toastify";

export const handleLogout = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem("user");
    toast.success("Logout successfully");
    window.location.href = "/login";
  } catch (err: any) {
    console.log(err);
    toast.error(err || "Unable to logout!");
  }
};
