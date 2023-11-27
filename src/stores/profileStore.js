import { create } from "zustand";
import { sgAxios } from "../configs/axios";
import { errToast } from "../utility/toaster";

const profileStore = set => ({
  profile: null,
  loading: false,
  getProfile: () => {
    set(() => ({ loading: true }));
    sgAxios
      .get(`/users/profile`)
      .then(res => {
        if (res.data.success) {
          set(() => ({
            profile: res.data.profile,
          }));
          return;
        }
        errToast("Failed to get profile");
      })
      .catch(() => {
        errToast("Failed to get profile");
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
  },
});

const useProfileStore = create(profileStore);

export default useProfileStore;
