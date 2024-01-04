import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";
import { socket } from "../configs/socket";

const playerArenaStore = (set, get) => ({
  arena: null,
  currentBet: null,
  previousOutcome: null,
  currentRoundOutcome: "-",
  totalBets: {
    meron: 0,
    wala: 0,
    totalBets: 0,
  },
  loading: {
    arena: false,
    bet: false,
    previousOutcome: false,
  },
  success: {
    bet: false,
    roundFinish: false,
  },
  setCurrentOutcome: outcome => set(() => ({ currentRoundOutcome: outcome })),
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
  updateSetRound: data => set(() => ({ arena: { ...data } })),
  updateNextRound: data => {
    set(() => ({
      arena: { ...data },
      totalBets: { meron: 0, wala: 0, totalBets: 0 },
      currentBet: null,
      currentRoundOutcome: "-",
    }));
  },
  updatePreviousOutcome: prevOutcome => {
    set(() => ({ previousOutcome: { ...prevOutcome } }));
  },
  getPreviousOutcome: arenaId => {
    set(state => ({ loading: { ...state.loading, previousOutcome: true } }));
    sgAxios
      .get(`/arenas/outcome/${arenaId}/previous`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ previousOutcome: { ...res.data.previousOutcome } }));
          return;
        }
        errToast("Failed to get previous outcome");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get previous outcome");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, previousOutcome: false },
        }));
      });
  },
  updateTotalBets: data => {
    const { totalMeron, totalWala, totalBets } = data;
    set(state => ({
      totalBets: {
        ...state.totalBets,
        meron: totalMeron,
        wala: totalWala,
        totalBets: totalBets,
      },
    }));
  },
  resetSuccess: () => {
    set(state => ({
      success: { ...state.success, bet: false, roundFinish: false },
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
  changeBettingStatus: (arenaId, status) => {
    if (get().arena?._id === arenaId) {
      set(state => ({
        arena: {
          ...state.arena,
          bettingStatus: status,
        },
      }));
    }
  },
  betOnMeron: data => {
    set(state => ({ loading: { ...state.loading, bet: true } }));
    sgAxios
      .post(`/bets/meron/create`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            currentBet: res.data.bet,
            success: { ...state.success, bet: true },
          }));
          socket.emit("add:total-bets", res.data.bet);
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to bet on meron");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, bet: false } }));
      });
  },
  betOnWala: data => {
    set(state => ({ loading: { ...state.loading, bet: true } }));
    sgAxios
      .post(`/bets/wala/create`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            currentBet: res.data.bet,
            success: { ...state.success, bet: true },
          }));
          socket.emit("add:total-bets", res.data.bet);
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to bet on wala");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, bet: false } }));
      });
  },
  betOnDraw: data => {
    set(state => ({ loading: { ...state.loading, bet: true } }));
    sgAxios
      .post(`/bets/draw/create`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            currentBet: res.data.bet,
            success: { ...state.success, bet: true },
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to bet on draw");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, bet: false } }));
      });
  },
  getCurrentBet: arenaId => {
    sgAxios
      .get(`/bets/current/${arenaId}`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            currentBet: res.data.currentBet,
          }));

          return;
        }
      })
      .catch(error => {
        console.log();
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to get current bet");
      });
  },
  finishRound: data => {
    set(state => ({ loading: { ...state.loading, previousOutcome: true } }));
    sgAxios
      .put(`/arenas/player/finish/round`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({ success: { ...state.success, roundFinish: true } }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to check winnings");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, previousOutcome: false },
        }));
      });
  },
});

const usePlayerArenaStore = create(playerArenaStore);

export default usePlayerArenaStore;
