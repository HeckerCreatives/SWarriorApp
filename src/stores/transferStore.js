import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import toast from "react-hot-toast";
import { errToast, successToast } from "../utility/toaster";
import axios from "axios";

const transferStore = (set, get) => ({
  request: null,
  history: {
    histories: [],
    totalPages: 1,
    prevPage: null,
    nextPage: null,
  },
  loading: {
    credit: false,
    history: false,
  },
  success: {
    credit: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: { ...state.success, credit: false },
    }));
  },
  transferCredit: data => {
    set(state => ({
      loading: { ...state.loading, credit: true },
    }));
    sgAxios
      .put(`/transfers/credit`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, credit: true },
          }));
          successToast("Successfully transferred");
          return;
        }
        errToast(message || "Failed to transfer credits");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to transfer credits");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, credit: false },
        }));
      });
  },
  agentTransferCredit: data => {
    set(state => ({
      loading: { ...state.loading, credit: true },
    }));
    sgAxios
      .put(`/transfers/agent/credit`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, credit: true },
          }));
          successToast("Successfully transferred");
          return;
        }
        errToast(message || "Failed to transfer credits");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to transfer credits");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, credit: false },
        }));
      });
  },
  getAllCreditTransfers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, history: true },
    }));
    sgAxios
      .get(`/transfers/${limit}/${page}/history`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            history: {
              ...state.history,
              histories: res.data.histories,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch transfer credits history.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch transfer credits history.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, history: false },
        }));
      });
  },
  getAgentCreditTransfers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, history: true },
    }));
    sgAxios
      .get(`/transfers/agent/${limit}/${page}/history`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            history: {
              ...state.history,
              histories: res.data.histories,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch transfer credits history.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch transfer credits history.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, history: false },
        }));
      });
  },
  getTransfersById: (agentId, limit, page) => {
    if (get().request) {
      get().request.cancel();
    }

    const abort = axios.CancelToken.source();
    set(state => ({
      request: abort,
      loading: { ...state.loading, history: true },
    }));

    sgAxios
      .get(`/transfers/${agentId}/${limit}/${page}/by-agent`, {
        cancelToken: abort.token,
      })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            history: {
              ...state.history,
              histories: res.data.histories,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
            loading: { ...state.loading, history: false },
          }));
          return;
        }
        set(state => ({
          request: abort,
          loading: { ...state.loading, history: false },
        }));
        errToast("Failed to fetch transfer credits history.");
      })
      .catch(error => {
        if (error.message === "canceled") return;
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch transfer credits history.");
      });
  },
});

const useTransferStore = create(transferStore);

export default useTransferStore;
