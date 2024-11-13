// atoms/authAtoms.js
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const isLoggedInAtom = atom({
  key: "isLoggedInAtom",
  default: false,
  effects_UNSTABLE: [persistAtom]
});
