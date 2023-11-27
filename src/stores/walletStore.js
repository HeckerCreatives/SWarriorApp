import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import toast from "react-hot-toast";
import { errToast } from "../utility/toaster";

const walletStore = set => ({
  topCredit: {
    wallets: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  topCommissions: {
    wallets: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  loading: {
    top: false,
  },
  getTopCreditors: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, top: true },
    }));
    sgAxios
      .get(`/wallets/top/${limit}/${page}/credit`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            topCredit: {
              ...state.topCredit,
              wallets: res.data.wallets,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to get top points");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create user.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, top: false },
        }));
      });
  },
  getTopCommissioners: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, top: true },
    }));
    sgAxios
      .get(`/wallets/top/${limit}/${page}/commission`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            topCommissions: {
              ...state.topCommissions,
              wallets: res.data.wallets,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to get top points");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create user.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, top: false },
        }));
      });
  },
});

const useWalletStore = create(walletStore);

export default useWalletStore;
