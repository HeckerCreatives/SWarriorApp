import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const agentStore = (set, get) => ({
  financer: {
    agents: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  sub: { agents: [], totalPages: 0, nextPage: null, prevPage: null },
  master: { agents: [], totalPages: 0, nextPage: null, prevPage: null },
  gold: { agents: [], totalPages: 0, nextPage: null, prevPage: null },
  banned: { agents: [], totalPages: 0, nextPage: null, prevPage: null },
  pending: { agents: [], totalPages: 0, nextPage: null, prevPage: null },
  moderator: {
    agents: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  csr: {
    agents: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  accountant: {
    agents: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  player: {
    agents: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  loading: {
    financer: false,
    sub: false,
    master: false,
    gold: false,
    moderator: false,
    accountant: false,
    commsUpdate: false,
    csr: false,
    player: false,
    ban: false,
    pending: false,
    banned: false,
    approve: false,
  },
  success: {
    commsUpdate: false,
    ban: false,
    approve: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        commsUpdate: false,
        ban: false,
        approve: false,
      },
    }));
  },
  updateAgentCommsRate: (agentType, data) => {
    set(state => ({
      loading: { ...state.loading, commsUpdate: true },
    }));
    sgAxios
      .put("/commissions/commission-rate", data)
      .then(res => {
        if (res.data.success) {
          let clone = [...get()[`${agentType}`].agents];
          const ind = clone.findIndex(e => e._id === res.data.agentId);
          clone[ind].commissions.commisionRate = res.data.newRate;
          set(state => ({
            [`${agentType}`]: { ...state[`${agentType}`], agents: [...clone] },
          }));
          successToast("Successfully updated");
          return;
        }
        errToast("Failed to update commission rate");
      })
      .catch(error => {
        console.log(error);
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to update commission rate");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, commsUpdate: false },
        }));
      });
  },
  getFinancers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, financer: true },
    }));
    sgAxios
      .get(`/users/financers/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            financer: {
              ...state.financer,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch financers.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch financers.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, financer: false },
        }));
      });
  },
  searchFinancers: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, financer: true },
    }));
    sgAxios
      .get(`/users/financers/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            financer: {
              ...state.financer,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch financers.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch financers.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, financer: false },
        }));
      });
  },
  getSubs: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, sub: true },
    }));
    sgAxios
      .get(`/users/subs/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            sub: {
              ...state.sub,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch subs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch subs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, sub: false },
        }));
      });
  },
  searchSubs: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, sub: true },
    }));
    sgAxios
      .get(`/users/subs/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            sub: {
              ...state.sub,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch subs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch subs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, sub: false },
        }));
      });
  },
  getMasters: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, master: true },
    }));
    sgAxios
      .get(`/users/masters/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            master: {
              ...state.master,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch masters.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch masters.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, master: false },
        }));
      });
  },
  searchMasters: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, master: true },
    }));
    sgAxios
      .get(`/users/masters/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            master: {
              ...state.master,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch masters.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch masters.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, master: false },
        }));
      });
  },
  getGolds: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, gold: true },
    }));
    sgAxios
      .get(`/users/golds/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            gold: {
              ...state.gold,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch golds.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch golds.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, gold: false },
        }));
      });
  },
  searchGolds: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, gold: true },
    }));
    sgAxios
      .get(`/users/golds/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            gold: {
              ...state.gold,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch golds.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch golds.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, gold: false },
        }));
      });
  },
  getModerators: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, moderator: true },
    }));
    sgAxios
      .get(`/users/moderators/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            moderator: {
              ...state.moderator,
              agents: res.data.moderators,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch moderators.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch moderators.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, moderator: false },
        }));
      });
  },
  searchModerators: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, gold: true },
    }));
    sgAxios
      .get(`/users/moderators/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            moderator: {
              ...state.moderator,
              agents: res.data.moderators,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch moderators.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch moderators.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, moderator: false },
        }));
      });
  },
  getAccountants: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, accountant: true },
    }));
    sgAxios
      .get(`/users/accountants/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            accountant: {
              ...state.accountant,
              agents: res.data.accountants,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch accountants.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch accountants.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, accountant: false },
        }));
      });
  },
  searchAccountants: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, accountant: true },
    }));
    sgAxios
      .get(`/users/accountants/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            accountant: {
              ...state.accountant,
              agents: res.data.accountants,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch accountants.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch accountants.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, accountant: false },
        }));
      });
  },
  getCsrs: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, csr: true },
    }));
    sgAxios
      .get(`/users/csr/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            csr: {
              ...state.csr,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch csrs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch csrs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, csr: false },
        }));
      });
  },
  searchCsrs: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, csr: true },
    }));
    sgAxios
      .get(`/users/csr/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            csr: {
              ...state.csr,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch csrs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch csrs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, csr: false },
        }));
      });
  },
  getPlayers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, player: true },
    }));
    sgAxios
      .get(`/users/players/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            player: {
              ...state.player,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch players.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch players.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, player: false },
        }));
      });
  },
  searchPlayers: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, player: true },
    }));
    sgAxios
      .get(`/users/players/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            player: {
              ...state.player,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch players.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch players.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, player: false },
        }));
      });
  },
  agentGetSubs: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, sub: true },
    }));
    sgAxios
      .get(`/users/agent/subs/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            sub: {
              ...state.sub,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch subs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch subs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, sub: false },
        }));
      });
  },
  agentSearchSubs: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, sub: true },
    }));
    sgAxios
      .get(`/users/agent/subs/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            sub: {
              ...state.sub,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch subs.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch subs.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, sub: false },
        }));
      });
  },
  agentGetMasters: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, master: true },
    }));
    sgAxios
      .get(`/users/agent/masters/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            master: {
              ...state.master,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch masters.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch masters.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, master: false },
        }));
      });
  },
  agentSearchMasters: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, master: true },
    }));
    sgAxios
      .get(`/users/agent/masters/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            master: {
              ...state.master,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch master.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch master.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, master: false },
        }));
      });
  },
  agentGetGolds: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, gold: true },
    }));
    sgAxios
      .get(`/users/agent/golds/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            gold: {
              ...state.gold,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch golds.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch golds.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, gold: false },
        }));
      });
  },
  agentSearchGolds: (limit, page, filter) => {
    set(state => ({
      loading: { ...state.loading, gold: true },
    }));
    sgAxios
      .get(`/users/agent/golds/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            gold: {
              ...state.gold,
              agents: res.data.agents,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch golds.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch golds.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, gold: false },
        }));
      });
  },
  agentGetActivePlayers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, player: true },
    }));
    sgAxios
      .get(`/users/agent/active/players/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            player: {
              ...state.player,
              agents: res.data.players,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch players.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch players.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, player: false },
        }));
      });
  },
  agentSearchActivePlayers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, player: true },
    }));
    sgAxios
      .get(`/users/agent/active/players/${limit}/${page}/${filter}/search`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            player: {
              ...state.player,
              agents: res.data.players,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch players.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch players.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, player: false },
        }));
      });
  },
  agentGetPendingUsers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, pending: true },
    }));
    sgAxios
      .get(`/users/pending/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            pending: {
              ...state.pending,
              agents: res.data.players,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch pending users.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch pending users.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, pending: false },
        }));
      });
  },
  agentGetBannedUsers: (limit, page) => {
    set(state => ({
      loading: { ...state.loading, banned: true },
    }));
    sgAxios
      .get(`/users/banned/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            banned: {
              ...state.banned,
              agents: res.data.players,
              totalPages: res.data.totalPages,
              prevPage: res.data.prevPage,
              nextPage: res.data.nextPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch banned users.");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch banned users.");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, banned: false },
        }));
      });
  },
  agentBanUser: data => {
    set(state => ({
      loading: { ...state.loading, ban: true },
    }));
    sgAxios
      .put("/users/ban", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.ban, ban: true },
          }));
          successToast("Successfully Banned!");
          return;
        }
        errToast("Failed to ban users");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to ban users");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, ban: false },
        }));
      });
  },
  agentUnbanUser: data => {
    set(state => ({
      loading: { ...state.loading, ban: true },
    }));
    sgAxios
      .put("/users/unban", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.loading, ban: true },
          }));
          successToast("Successfully Banned!");
          return;
        }
        errToast("Failed to ban users");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to ban users");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, ban: false },
        }));
      });
  },
  agentApprovePlayer: data => {
    set(state => ({
      loading: { ...state.loading, approve: true },
    }));
    sgAxios
      .put("/users/player/approve", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, approve: true },
          }));
          successToast("Successfully Approved!");
          return;
        }
        errToast("Failed to approve users");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to approve users");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, approve: false },
        }));
      });
  },
  agentApproveAgent: data => {
    set(state => ({
      loading: { ...state.loading, approve: true },
    }));
    sgAxios
      .put("/users/agent/approve", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, approve: true },
          }));
          successToast("Successfully Approved!");
          return;
        }
        errToast("Failed to approve users");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to approve users");
      })
      .finally(() => {
        set(state => ({
          loading: { ...state.loading, approve: false },
        }));
      });
  },
});

const useAgentStore = create(agentStore);

export default useAgentStore;
