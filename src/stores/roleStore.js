import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import toast from "react-hot-toast";

const roleStore = set => ({
  roles: [],
  getRoles: () => {
    sgAxios.get(`/roles`).then(res => {
      if (res.data.success) {
        set(() => ({
          roles: res.data.roles,
        }));
        return;
      }
      toast.error("Failed to get roles.", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    });
  },
});

const useRoleStore = create(roleStore);

export default useRoleStore;
