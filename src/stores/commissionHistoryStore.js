import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const commissionHistoryStore = set => ({
  commission: {
    commissions: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  commissionByUser: {
    commissions: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  dashboard: {
    regular: 0,
    draw: 0,
    gross: 0,
  },
  loading: {
    commissions: false,
    dashboard: false,
    commissionByUser: false,
  },
  getCommissionHistory: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, commissions: true } }));
    sgAxios
      .get(`/commission-histories/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            commission: {
              ...state.commission,
              commissions: res.data.commissions,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch commission histories.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch commission histories.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, commissions: false } }));
      });
  },
  getCommissionHistoryByUser: async (limit, page, arenaId) => {
    set(state => ({ loading: { ...state.loading, commissionByUser: true } }));
    sgAxios
      .get(`/commission-histories/${limit}/${page}/${arenaId}/by-user`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            commissionByUser: {
              ...state.commissionByUser,
              commissions: res.data.commissions,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch commission histories.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch commission histories.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, commissionByUser: false },
        }));
      });
  },
  getCommissionData: async () => {
    set(state => ({ loading: { ...state.loading, dashboard: true } }));
    sgAxios
      .get(`/commission-histories/dashboard`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            dashboard: {
              ...state.dashboard,
              regular: res.data.regular,
              draw: res.data.draw,
              gross: res.data.gross,
            },
          }));
          return;
        }
        errToast("Failed to fetch commission data.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch commission data.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, dashboard: false } }));
      });
  },
});

const useCommissionHistoryStore = create(commissionHistoryStore);

export default useCommissionHistoryStore;
