import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const cashoutStore = set => ({
  ownCredit: {
    requests: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  ownCommission: {
    requests: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  allCredit: {
    requests: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  allCommission: {
    requests: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  loading: {
    ownCredit: false,
    ownCommission: false,
    allCredit: false,
    allCommission: false,
    status: false,
  },
  success: {
    status: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: { ...state.success, status: false },
    }));
  },
  getOwnCreditRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, ownCredit: true } }));
    sgAxios
      .get(`/cashouts/own/request/${limit}/${page}/credit`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            ownCredit: {
              ...state.ownCredit,
              requests: res.data.histories,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch cashout histories");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch cashout histories");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, ownCredit: false } }));
      });
  },
  getOwnCommissionRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, ownCommission: true } }));
    sgAxios
      .get(`/cashouts/own/request/${limit}/${page}/commission`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            ownCommission: {
              ...state.ownCommission,
              requests: res.data.histories,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch cashout histories");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch cashout histories");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, ownCommission: false } }));
      });
  },
  getAllPendingCreditRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, allCredit: true } }));
    sgAxios
      .get(`/cashouts/pending/request/${limit}/${page}/credit`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            allCredit: {
              ...state.allCredit,
              requests: res.data.cashouts,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch pending cashout requests");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch pending cashout requests");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, allCredit: false } }));
      });
  },
  getAllPendingCommissionRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, allCommission: true } }));
    sgAxios
      .get(`/cashouts/pending/request/${limit}/${page}/commission`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            allCommission: {
              ...state.allCommission,
              requests: res.data.cashouts,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch pending cashout requests");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch pending cashout requests");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, allCommission: false } }));
      });
  },
  getReferralPendingCreditRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, allCredit: true } }));
    sgAxios
      .get(`/cashouts/referral/pending/request/${limit}/${page}/credit`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            allCredit: {
              ...state.allCredit,
              requests: res.data.cashouts,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch pending cashout requests");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch pending cashout requests");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, allCredit: false } }));
      });
  },
  getReferralPendingCommissionRequest: (limit, page) => {
    set(state => ({ loading: { ...state.loading, allCommission: true } }));
    sgAxios
      .get(`/cashouts/referral/pending/request/${limit}/${page}/commission`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            allCommission: {
              ...state.allCommission,
              requests: res.data.cashouts,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch pending cashout requests");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch pending cashout requests");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, allCommission: false } }));
      });
  },
  approveRejectRequest: (data, type) => {
    set(state => ({ loading: { ...state.loading, status: true } }));
    sgAxios
      .put(`/cashouts/${type}/cashout`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({ success: { ...state.success, status: true } }));
          successToast(
            `Successfully ${type === "approve" ? "approved" : "rejected"}!`
          );
          return;
        }
        errToast(`Failed to ${type} cashout requests`);
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to ${type} cashout requests`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, status: false } }));
      });
  },
  agentApproveRejectRequest: (data, type) => {
    set(state => ({ loading: { ...state.loading, status: true } }));
    sgAxios
      .put(`cashouts/agent/${type}/cashout`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({ success: { ...state.success, status: true } }));
          successToast(
            `Successfully ${type === "approve" ? "approved" : "rejected"}!`
          );
          return;
        }
        errToast(`Failed to ${type} cashout requests`);
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to ${type} cashout requests`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, status: false } }));
      });
  },
});

const useCashoutStore = create(cashoutStore);

export default useCashoutStore;
