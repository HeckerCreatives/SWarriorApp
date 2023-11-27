import toast from "react-hot-toast";

export const errToast = msg =>
  toast.error(msg, {
    style: {
      background: "#333",
      color: "#fff",
    },
  });

export const successToast = msg =>
  toast.success(msg, {
    style: {
      background: "#333",
      color: "#fff",
    },
  });
