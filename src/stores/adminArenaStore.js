import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const adminArenaStore = (set, get) => ({
  arena: null,
  currentRound: null,
  currentRoundOutcome: "-",
  totalBets: {
    meron: 0,
    wala: 0,
  },
  loading: {
    arena: false,
    status: false,
    finish: false,
    currentOutcome: false,
    nextRound: false,
    setRound: false,
  },
  success: {
    nextRound: false,
    setRound: false,
    finish: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        nextRound: false,
        setRound: false,
        finish: false,
      },
    }));
  },
  getCurrentOutcome: arenaId => {
    set(state => ({ loading: { ...state.loading, currentOutcome: true } }));
    sgAxios
      .get(`/arenas/outcome/${arenaId}/current`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ currentRoundOutcome: res.data.currentRoundOutcome }));
          return;
        }
        errToast("Failed to get current outcome");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get current outcome");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, currentOutcome: false },
        }));
      });
  },
  arenaFinishRound: data => {
    set(state => ({ loading: { ...state.loading, finish: true } }));
    sgAxios
      .put(`/arenas/finish/round`, data, { params: { ...data } })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, finish: true },
            currentRoundOutcome: res.data.currentRound.outcome,
            currentRound: res.data.currentRound,
          }));
          return;
        }
        errToast("Failed to finish round");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to finish round");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, finish: false } }));
      });
  },
  updateTotalBets: data => {
    const { totalMeron, totalWala } = data;
    set(state => ({
      totalBets: {
        ...state.totalBets,
        meron: totalMeron,
        wala: totalWala,
      },
    }));
  },
  getArena: arenaId => {
    set(state => ({ loading: { ...state.loading, arena: true } }));
    sgAxios
      .get(`/arenas/${arenaId}/byId`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ arena: { ...res.data.arena } }));
          return;
        }
        errToast("Failed to get arena");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get arena");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, arena: false } }));
      });
  },
  openBetting: data => {
    set(state => ({ loading: { ...state.loading, status: true } }));
    sgAxios
      .put(`/arenas/betting/open`, data, { params: { ...data } })
      .then(res => {
        if (res.data.success) {
          if (res.data.arenaId === get().arena._id) {
            set(state => ({
              arena: {
                ...state.arena,
                bettingStatus: res.data.bettingStatus,
              },
            }));
          }
          return;
        }
        errToast("Failed to open betting");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to open betting");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, status: false } }));
      });
  },
  closeBetting: data => {
    set(state => ({ loading: { ...state.loading, status: true } }));
    sgAxios
      .put(`/arenas/betting/close`, data, { params: { ...data } })
      .then(res => {
        if (res.data.success) {
          if (res.data.arenaId === get().arena._id) {
            set(state => ({
              arena: {
                ...state.arena,
                bettingStatus: res.data.bettingStatus,
              },
            }));
          }
          return;
        }
        errToast("Failed to close betting");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to close betting");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, status: false } }));
      });
  },
  arenaNextRound: data => {
    set(state => ({ loading: { ...state.loading, nextRound: true } }));
    sgAxios
      .put(`/arenas/next/round`, data, { params: { arenaId: data.arenaId } })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            arena: res.data.arena,
            totalBets: { meron: 0, wala: 0 },
            currentRoundOutcome: "-",
            success: { ...state.success, nextRound: true },
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to go next round");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, nextRound: false } }));
      });
  },
  arenaUpdateRound: data => {
    set(state => ({ loading: { ...state.loading, setRound: true } }));
    sgAxios
      .put(`/arenas/set/round`, data, { params: { arenaId: data.arenaId } })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            arena: res.data.arena,
            success: { ...state.success, setRound: true },
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to set round");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, setRound: false } }));
      });
  },
});

const useAdminArenaStore = create(adminArenaStore);

export default useAdminArenaStore;
