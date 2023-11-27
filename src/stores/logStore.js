import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const logStore = set => ({
  login: {
    logs: [],
    totalPages: 1,
    prevPage: null,
    nextPage: null,
  },
  credit: { logs: [], totalPages: 1, prevPage: null, nextPage: null },
  commission: { logs: [], totalPages: 1, prevPage: null, nextPage: null },
  loading: {
    login: false,
    credit: false,
    commission: false,
  },
  getLoginLogs: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, login: true } }));
    sgAxios
      .get(`/logs/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            login: {
              ...state.login,
              logs: res.data.logs,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch login logs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch login logs.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, login: false } }));
      });
  },
  getCreditLogs: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, credit: true } }));
    sgAxios
      .get(`/logs/credit/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            credit: {
              ...state.credit,
              logs: res.data.logs,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch credit logs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch credit logs.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, credit: false } }));
      });
  },
  getCommissionLogs: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, commission: true } }));
    sgAxios
      .get(`/logs/commission/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            commission: {
              ...state.commission,
              logs: res.data.logs,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch commission logs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch commission logs.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, commission: false } }));
      });
  },
  getCreditLogsByAgent: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, credit: true } }));
    sgAxios
      .get(`/logs/agent/credit/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            credit: {
              ...state.credit,
              logs: res.data.logs,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch credit logs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch credit logs.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, credit: false } }));
      });
  },
  getCommissionLogsByAgent: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, commission: true } }));
    sgAxios
      .get(`/logs/agent/commission/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            commission: {
              ...state.commission,
              logs: res.data.logs,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch commission logs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch commission logs.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, commission: false } }));
      });
  },
});

const useLogStore = create(logStore);

export default useLogStore;
