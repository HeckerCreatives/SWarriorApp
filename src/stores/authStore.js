import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const authStore = set => ({
  loading: {
    login: false,
    agentPassword: false,
  },
  success: {
    agentPassword: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        agentPassword: false,
      },
    }));
  },
  login: async user => {
    set(state => ({
      loading: { ...state.loading, login: true },
    }));
    sgAxios
      .post(`/auth/login`, user)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("auth", res.data?.info);
          window.location.reload();
        } else {
          errToast(res.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        const message = error.response?.data?.msg;
        errToast(message || "Invalid credentials");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, login: false },
        }));
      });
  },
  agentChangePassword: data => {
    set(state => ({
      loading: { ...state.loading, agentPassword: true },
    }));
    sgAxios
      .put(`/auth/agent/password`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, agentPassword: true },
          }));
          successToast("Change password successfully");
          return;
        }
        errToast("Failed to change password");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to change password");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, agentPassword: false },
        }));
      });
  },
});

const useAuthStore = create(authStore);

export default useAuthStore;
