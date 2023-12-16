import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const arenaStore = (set, get) => ({
  videos: [],
  arena: {
    arenas: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  closed: {
    arenas: [],
    totalPages: 0,
    nextPage: null,
    prevPage: null,
  },
  loading: {
    arenas: false,
    videos: false,
    create: false,
    update: false,
    remove: false,
  },
  success: {
    create: false,
    update: false,
    remove: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        create: false,
        update: false,
        remove: false,
      },
    }));
  },
  getArenas: (limit, page) => {
    set(state => ({ loading: { ...state.loading, arenas: true } }));
    sgAxios
      .get(`/arenas/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            arena: {
              ...state.arena,
              arenas: res.data.arenas,
              totalPages: res.data.totalPages,
              nextPage: res.data.nextPage,
              prevPage: res.data.prevPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch arenas");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch arenas");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, arenas: false } }));
      });
  },
  getClosedArenas: (limit, page) => {
    set(state => ({ loading: { ...state.loading, arenas: true } }));
    sgAxios
      .get(`/arenas/${limit}/${page}/closed`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            closed: {
              ...state.closed,
              arenas: res.data.arenas,
              totalPages: res.data.totalPages,
              nextPage: res.data.nextPage,
              prevPage: res.data.prevPage,
            },
          }));
          return;
        }
        errToast("Failed to fetch closed arenas");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch closed arenas");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, arenas: false } }));
      });
  },
  getVideos: () => {
    set(state => ({ loading: { ...state.loading, videos: true } }));
    sgAxios
      .get(`/arenas/videos`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            videos: res.data.videos,
          }));
          return;
        }
        errToast("Failed to fetch videos");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to fetch videos");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, videos: false } }));
      });
  },
  createArena: data => {
    set(state => ({ loading: { ...state.loading, create: true } }));
    sgAxios
      .post(`/arenas`, data)
      .then(res => {
        if (res.data.success) {
          let clone = [
            ...get().videos.filter(
              e => e._id !== res.data.arena.arenaVideo.videoId
            ),
          ];
          set(state => ({
            success: { ...state.success, create: true },
            videos: [...clone],
          }));
          successToast("Arena successfully created");
          return;
        }
        errToast("Failed to create arena");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create arena");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, create: false } }));
      });
  },
  updateArena: data => {
    set(state => ({ loading: { ...state.loading, update: true } }));
    sgAxios
      .put(`/arenas`, data)
      .then(res => {
        if (res.data.success) {
          let clone = [
            ...get().videos.filter(
              e => e._id !== res.data.arena.arenaVideo.videoId
            ),
          ];

          if (res.data?.oldVideo) {
            clone.push(res.data.oldVideo);
          }

          let clone2 = [...get().arena.arenas];
          const ind = clone2.findIndex(e => e._id === res.data.arena._id);
          clone2[ind] = res.data.arena;

          set(state => ({
            success: { ...state.success, update: true },
            videos: [...clone],
            arena: {
              ...state.arena,
              arenas: [...clone2],
            },
          }));
          successToast("Arena successfully updated");
          return;
        }
        errToast("Failed to update arena");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to update arena");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, update: false } }));
      });
  },
  deleteArena: arenaId => {
    set(state => ({ loading: { ...state.loading, remove: true } }));
    sgAxios
      .delete(`/arenas/${arenaId}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({ success: { ...state.success, remove: true } }));
          successToast("Arena successfully closed");
          return;
        }
        errToast("Failed to close arena");
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to close arena");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, remove: false } }));
      });
  },
});

const useArenaStore = create(arenaStore);

export default useArenaStore;
