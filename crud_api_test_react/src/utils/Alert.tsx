import { toast, ToastOptions, Flip, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "warning" | "info";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Flip,
};

const showToast = (message: string, type: ToastType) => {
  toast[type](message, {
    ...toastOptions,
    position: type === "success" ? "top-right" : "top-center",
    transition: type === "warning" ? Slide : Zoom,
  });
};

export default showToast;
