import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast, successToast } from "../utility/toaster";

const videoStore = (set, get) => ({
  video: {
    videos: [],
    nextPage: null,
    prevPage: null,
    totalPages: 0,
  },
  loading: {
    videos: false,
    create: false,
    update: false,
    delete: false,
  },
  success: {
    create: false,
    update: false,
    delete: false,
  },
  resetSuccess: () => {
    set(state => ({
      success: {
        ...state.success,
        create: false,
        update: false,
        delete: false,
      },
    }));
  },
  getVideos: (limit, page) => {
    set(state => ({ loading: { ...state.loading, videos: true } }));
    sgAxios
      .get(`/videos/${limit}/${page}/all`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            video: {
              ...state.video,
              videos: res.data.videos,
              totalPages: res.data.totalPages,
              nextPage: res.data.nextPage,
              prevPage: res.data.prevPage,
            },
          }));
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to get videos.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, videos: false } }));
      });
  },
  createVideo: data => {
    set(state => ({ loading: { ...state.loading, create: true } }));
    sgAxios
      .post(`/videos`, data)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, create: true },
          }));
          successToast("Video successfully created.");
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to create video.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, create: false } }));
      });
  },
  updateVideo: data => {
    set(state => ({ loading: { ...state.loading, update: true } }));
    sgAxios
      .put(`/videos`, data)
      .then(res => {
        if (res.data.success) {
          let clone = [...get().video.videos];
          const ind = clone.findIndex(e => e._id === res.data.video._id);
          clone[ind] = res.data.video;
          set(state => ({
            success: { ...state.success, update: true },
            video: {
              ...state.video,
              videos: [...clone],
            },
          }));
          successToast("Video successfully updated.");
          return;
        }
      })
      .catch(error => {
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to update video.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, update: false } }));
      });
  },
  deleteVideo: videoId => {
    set(state => ({ loading: { ...state.loading, delete: true } }));
    sgAxios
      .delete(`/videos/${videoId}`)
      .then(res => {
        if (res.data.success) {
          set(state => ({
            success: { ...state.success, delete: true },
          }));
          successToast("Video successfully deleted.");
          return;
        }
      })
      .catch(error => {
        console.log(error);
        const message = error.response?.data?.error?.message;
        errToast(message || "Failed to delete video.");
      })
      .finally(() => {
        set(state => ({ loading: { ...state.loading, delete: false } }));
      });
  },
});

const useVideoStore = create(videoStore);

export default useVideoStore;
