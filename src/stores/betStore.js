import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const betStore = set => ({
  arenaBetsByUser: [],
  bet: {
    bets: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  loading: {
    bets: false,
    arenaBetsByUser: false,
  },
  success: {
    process: false,
  },
  resetSuccess: () => {
    set(state => ({ success: { ...state.success, process: false } }));
  },
  adminGetBets: async (limit, page) => {
    set(state => ({ loading: { ...state.loading, bets: true } }));
    sgAxios
      .get(`/bets/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            bet: {
              ...state.bet,
              bets: res.data.bets,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch bets.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch bets.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, bets: false } }));
      });
  },
  getArenaBetsByUser: async arenaId => {
    set(state => ({ loading: { ...state.loading, arenaBetsByUser: true } }));
    sgAxios
      .get(`/bets/history/${arenaId}`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            arenaBetsByUser: res.data.bets,
          }));
          return;
        }
        errToast("Failed to fetch bet history.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch bet history.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, arenaBetsByUser: false },
        }));
      });
  },
  processUnprocessedBets: async () => {
    sgAxios.put(`/bets/unprocessed/bets`).then(res => {
      if (res.data.success) {
        set(state => ({ success: { ...state.success, process: true } }));
        return;
      }
    });
  },
});

const useBetStore = create(betStore);

export default useBetStore;
