import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const dashboardStore = set => ({
  totalComms: 0,
  totalCredits: 0,
  playerTotalCreds: 0,
  convertedComms: 0,
  companyComms: 0,
  regularEarnings: {
    currentMonth: 0,
    lastMonth: 0,
  },
  otherStats: {
    systemPoints: 0,
    activePlayers: 0,
    activeAgents: 0,
    blockedUsers: 0,
    cashins: 0,
    cashouts: 0,
  },
  loading: {
    totalComms: false,
    totalCredits: false,
    playerTotalCreds: false,
    convertedComms: false,
    otherStats: false,
    companyComms: false,
    regularEarnings: false,
  },
  getTotalComms: () => {
    set(state => ({ loading: { ...state.loading, totalComms: true } }));
    sgAxios
      .get(`/dashboards/agent/total/commissions`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ totalComms: res.data.total }));
          return;
        }
        errToast("Failed to get agent total commissions");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get agent total commissions");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, totalComms: false } }));
      });
  },
  getTotalCredits: () => {
    set(state => ({ loading: { ...state.loading, totalCredits: true } }));
    sgAxios
      .get(`/dashboards/agent/total/credits`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ totalCredits: res.data.total }));
          return;
        }
        errToast("Failed to get agent total credits");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get agent total credits");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, totalCredits: false } }));
      });
  },
  getPlayerTotalCredits: () => {
    set(state => ({ loading: { ...state.loading, playerTotalCreds: true } }));
    sgAxios
      .get(`/dashboards/player/total/credits`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ playerTotalCreds: res.data.total }));
          return;
        }
        errToast("Failed to get player total credits");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get agent player credits");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, playerTotalCreds: false },
        }));
      });
  },
  getTotalConverted: () => {
    set(state => ({ loading: { ...state.loading, convertedComms: true } }));
    sgAxios
      .get(`/dashboards/converted/total/commissions`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ convertedComms: res.data.total }));
          return;
        }
        errToast("Failed to get agent total commissions");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get agent total commissions");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, convertedComms: false },
        }));
      });
  },
  getOtherStats: () => {
    set(state => ({ loading: { ...state.loading, otherStats: true } }));
    sgAxios
      .get(`/dashboards/other/stats`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            otherStats: {
              ...state.otherStats,
              systemPoints: res.data.systemPoints,
              activePlayers: res.data.activePlayers,
              activeAgents: res.data.activeAgents,
              blockedUsers: res.data.blockedUsers,
              cashins: res.data.cashins,
              cashouts: res.data.cashouts,
            },
          }));
          return;
        }
        errToast("Failed to get other stats");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get other stats");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, otherStats: false },
        }));
      });
  },
  getCompanyComms: () => {
    set(state => ({ loading: { ...state.loading, companyComms: true } }));
    sgAxios
      .get(`/dashboards/company/commissions`)
      .then(res => {
        if (res.data.success) {
          set(() => ({ companyComms: res.data.companyCommission }));
          return;
        }
        errToast("Failed to get company commissions");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get company commissions");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, companyComms: false } }));
      });
  },
  getRegularEarnings: () => {
    set(state => ({ loading: { ...state.loading, regularEarnings: true } }));
    sgAxios
      .get(`/dashboards/regular/earnings`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            regularEarnings: {
              ...state.regularEarnings,
              currentMonth: res.data.currentMonth,
              lastMonth: res.data.lastMonth,
            },
          }));
          return;
        }
        errToast("Failed to get agent total commissions");
      })
      .catch(error => {
        const message = error.response?.data?.msg;
        errToast(message || "Failed to get agent total commissions");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, regularEarnings: false },
        }));
      });
  },
});

const useDashboardStore = create(dashboardStore);

export default useDashboardStore;
