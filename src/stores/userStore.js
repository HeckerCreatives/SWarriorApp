import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import axios from "axios";
import { errToast, successToast } from "../utility/toaster";

const userStore = (set, get) => ({
  referrer: "",
  points: 0,
  commission: 0,
  senders: [],
  receivers: [],
  request: {
    sender: null,
    receiver: null,
  },
  loading: {
    create: false,
    referrer: false,
    sender: false,
    receiver: false,
    points: false,
    commission: false,
    payment: false,
    cashoutCredit: false,
    cashoutComms: false,
    cashin: false,
  },
  success: {
    create: false,
    payment: false,
    cashoutCredit: false,
    cashoutComms: false,
    cashin: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        create: false,
        payment: false,
        cashoutCredit: false,
        cashoutComms: false,
        cashin: false,
      },
    }));
  },
  createAuthoritaiveUser: data => {
    set(state => ({
      loading: { ...state.loading, create: true },
    }));

    sgAxios
      .post(`/users/create`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, create: true },
          }));
          successToast("Successfully created.");
          return;
        }
        errToast("Failed to create user.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create user.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, create: false },
        }));
      });
  },
  registerUser: data => {
    set(state => ({
      loading: { ...state.loading, create: true },
    }));
    sgAxios
      .post(`/users/register`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, create: true },
          }));
          successToast(
            "Successfully registered. Please wait until your account has been approved."
          );
          return;
        }
        errToast("Failed to create user.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create user.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, create: false },
        }));
      });
  },
  getReferrer: async userId => {
    set(state => ({
      loading: { ...state.loading, referrer: true },
    }));
    sgAxios
      .get(`/users/referrer/${userId}`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            referrer: res.data.referrer,
          }));
          return;
        }
        errToast("Invalid Referrer.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Invalid Referrer.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, referrer: false },
        }));
      });
  },
  getSenders: async filter => {
    if (filter === "") {
      get().request.sender && get().request.sender.cancel();
      set(state => ({
        loading: { ...state.loading, sender: false },
        senders: [],
      }));
      return;
    }

    if (get().request.sender) {
      get().request.sender.cancel();
    }

    const abort = axios.CancelToken.source();
    set(state => ({
      request: { ...state.request, sender: abort },
      loading: { ...state.loading, sender: true },
    }));

    sgAxios
      .get(`/users/sender/${filter}`, {
        cancelToken: abort.token,
      })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            loading: { ...state.loading, sender: false },
            senders: [
              ...res.data.senders.map(e => ({
                value: e._id,
                label: e.username,
                amount: e.amount,
              })),
            ],
          }));
          return;
        }
        set(state => ({
          loading: { ...state.loading, sender: false },
        }));
      })
      .catch(error => {
        if (error.message === "canceled") {
          return;
        }
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch senders");
      });
  },
  getReceivers: async filter => {
    if (filter === "") {
      get().request.receiver && get().request.receiver.cancel();
      set(state => ({
        loading: { ...state.loading, receiver: false },
        receivers: [],
      }));
      return;
    }

    if (get().request.receiver) {
      get().request.receiver.cancel();
    }

    const abort = axios.CancelToken.source();
    set(state => ({
      request: { ...state.request, receiver: abort },
      loading: { ...state.loading, receiver: true },
    }));

    sgAxios
      .get(`/users/receiver/${filter}`, {
        cancelToken: abort.token,
      })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            loading: { ...state.loading, receiver: false },
            receivers: [
              ...res.data.receivers.map(e => ({
                value: e._id,
                label: e.username,
                amount: e.amount,
              })),
            ],
          }));
          return;
        }
        set(state => ({
          loading: { ...state.loading, receiver: false },
        }));
      })
      .catch(error => {
        if (error.message === "canceled") return;
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch receivers");
      });
  },
  csrGetReceivers: async filter => {
    if (filter === "") {
      get().request.receiver && get().request.receiver.cancel();
      set(state => ({
        loading: { ...state.loading, receiver: false },
        receivers: [],
      }));
      return;
    }

    if (get().request.receiver) {
      get().request.receiver.cancel();
    }

    const abort = axios.CancelToken.source();
    set(state => ({
      request: { ...state.request, receiver: abort },
      loading: { ...state.loading, receiver: true },
    }));

    sgAxios
      .get(`/users/csr/receiver/${filter}`, {
        cancelToken: abort.token,
      })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            loading: { ...state.loading, receiver: false },
            receivers: [
              ...res.data.receivers.map(e => ({
                value: e._id,
                label: e.username,
                amount: e.amount,
              })),
            ],
          }));
          return;
        }
        set(state => ({
          loading: { ...state.loading, receiver: false },
        }));
      })
      .catch(error => {
        if (error.message === "canceled") return;
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch receivers");
      });
  },
  agentGetReceivers: async filter => {
    if (filter === "") {
      get().request.receiver && get().request.receiver.cancel();
      set(state => ({
        loading: { ...state.loading, receiver: false },
        receivers: [],
      }));
      return;
    }

    if (get().request.receiver) {
      get().request.receiver.cancel();
    }

    const abort = axios.CancelToken.source();
    set(state => ({
      request: { ...state.request, receiver: abort },
      loading: { ...state.loading, receiver: true },
    }));

    sgAxios
      .get(`/users/agent/receiver/${filter}`, {
        cancelToken: abort.token,
      })
      .then(res => {
        if (res.data.success) {
          set(state => ({
            loading: { ...state.loading, receiver: false },
            receivers: [
              ...res.data.receivers.map(e => ({
                value: e._id,
                label: e.username,
                amount: e.amount,
              })),
            ],
          }));
          return;
        }
        set(state => ({
          loading: { ...state.loading, receiver: false },
        }));
      })
      .catch(error => {
        if (error.message === "canceled") return;
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch receivers");
      });
  },
  getCreditOwned: async () => {
    set(state => ({
      loading: { ...state.loading, points: true },
    }));
    sgAxios
      .get(`/users/credit/owned`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            points: res.data.amount,
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch owned points");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, points: false },
        }));
      });
  },
  getCommissionOwned: async () => {
    set(state => ({
      loading: { ...state.loading, commission: true },
    }));
    sgAxios
      .get(`/users/commission/owned`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            commission: res.data.amount,
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch owned commission");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, commission: false },
        }));
      });
  },
  updatePaymentMethod: async data => {
    set(state => ({
      loading: { ...state.loading, payment: true },
    }));
    sgAxios
      .put("/users/payment-mode", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, payment: true },
          }));
          successToast("Successfully updated.");
          return;
        }
        errToast("Failed to update payment method.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to update payment method.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, payment: false },
        }));
      });
  },
  requestCreditCashout: async data => {
    set(state => ({ loading: { ...state.loading, cashoutCredit: true } }));
    sgAxios
      .put(`/cashouts/credit`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, cashoutCredit: true },
            points: res.data.balance,
          }));
          successToast("Cashout successfully requested.");
          return;
        }
        errToast("Failed to request cashout");
      })
      .catch(error => {
        console.log(error);
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to request cashout");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, cashoutCredit: false } }));
      });
  },
  requestCommsCashout: async data => {
    set(state => ({ loading: { ...state.loading, cashoutComms: true } }));
    sgAxios
      .put(`/cashouts/commission`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, cashoutComms: true },
            commission: res.data.balance,
          }));
          return;
        }
        errToast("Failed to request cashout");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to request cashout");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, cashoutComms: false } }));
      });
  },
  cashinCredits: async data => {
    set(state => ({ loading: { ...state.loading, cashin: true } }));
    sgAxios
      .put(`/cashins`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            points: res.data.balance,
            success: { ...state.success, cashin: true },
          }));
          successToast("Cashin Successfully.");
          return;
        }
        errToast("Failed to cashin.");
      })
      .catch(error => {
        console.log(error);
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to cashin.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, cashin: false } }));
      });
  },
});

const useUserStore = create(userStore);

export default useUserStore;
