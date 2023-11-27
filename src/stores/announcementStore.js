import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const announcementStore = (set, get) => ({
  recent: { announcements: [], totalPages: 0, prevPage: null, nextPage: null },
  announcement: {
    announcements: [],
    totalPages: 0,
    prevPage: null,
    nextPage: null,
  },
  loading: {
    announcements: false,
    create: false,
    update: false,
    change: false,
    remove: false,
    recent: false,
  },
  success: {
    create: false,
    update: false,
    change: false,
    remove: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        create: false,
        update: false,
        change: false,
        remove: false,
      },
    }));
  },
  getAnnouncements: (limit, page) => {
    set(state => ({ loading: { ...state.loading, announcements: true } }));
    sgAxios
      .get(`announcements/${limit}/${page}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            announcement: {
              ...state.announcement,
              announcements: res.data.announcements,
              totalPages: res.data.totalPages,
              nextPage: res.data.nextPage,
              prevPage: res.data.prevPage,
            },
          }));
          return;
        }
        errToast("Failed to get announcements");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to get announcements`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, announcements: false } }));
      });
  },
  createAnnouncement: data => {
    set(state => ({ loading: { ...state.loading, create: true } }));
    sgAxios
      .post("announcements", data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, create: true },
            announcement: {
              ...state.announcement,
              announcements: [
                res.data.announcement,
                ...state.announcement.announcements,
              ],
            },
          }));
          successToast("Successfully created");
          return;
        }
        errToast("Failed to create an announcement");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to create an announcement`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, create: false } }));
      });
  },
  updateAnnouncement: data => {
    set(state => ({ loading: { ...state.loading, update: true } }));
    sgAxios
      .put("announcements", data)
      .then(res => {
        if (res.data.success) {
          let clone = [...get().announcement.announcements];
          const ind = clone.findIndex(e => e._id === res.data.announcement._id);
          clone[ind] = res.data.announcement;
          set(state => ({
            announcement: { ...state.announcement, announcements: [...clone] },
            success: { ...state.success, update: true },
          }));
          successToast("Successfully updated");
          return;
        }
        errToast("Failed to update an announcement");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to update an announcement`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, update: false } }));
      });
  },
  deleteAnnouncement: announcementId => {
    set(state => ({ loading: { ...state.loading, remove: true } }));
    sgAxios
      .delete(`announcements/${announcementId}`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          set(state => ({
            success: { ...state.success, remove: true },
          }));
          successToast("Successfully deleted");
          return;
        }
        errToast("Failed to delete an announcement");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to delete an announcement`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, remove: false } }));
      });
  },
  getRecentAnnouncements: (limit, page) => {
    set(state => ({ loading: { ...state.loading, recent: true } }));
    sgAxios
      .get(`announcements/${limit}/${page}/recent`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            recent: {
              ...state.recent,
              announcements: res.data.announcements,
              totalPages: res.data.totalPages,
              nextPage: res.data.nextPage,
              prevPage: res.data.prevPage,
            },
          }));
          return;
        }
        errToast("Failed to get recent announcements");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || `Failed to get recent announcements`);
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, recent: false } }));
      });
  },
});

const useAnnouncementStore = create(announcementStore);

export default useAnnouncementStore;
