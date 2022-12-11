import { selector } from "recoil";
import { textState } from "./atom";

export const charCountState = selector({
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);
    return text;
  },
  set: ({ set }, newValue) => {
    set(textState, newValue);
  },
});
