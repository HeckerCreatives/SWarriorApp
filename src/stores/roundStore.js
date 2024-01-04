import { create } from "zustand";
import { sgAxios } from "../configs/axios";

const roundStore = set => ({
  rounds: [],
  paya: [],
  loading: false,
  getRoundsByArena: arenaId => {
    set(() => ({ loading: true }));
    sgAxios
      .get(`/rounds/${arenaId}/all`)
      .then(res => {
        console.log(res.data.rounds);
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
  },
});

const useRoundStore = create(roundStore);

export default useRoundStore;
