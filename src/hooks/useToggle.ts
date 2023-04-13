import { useReducer } from "react";

function toggleReducer(state: boolean, nextValue?: any) {
  return typeof nextValue === "boolean" ? nextValue : !state;
}

function useToggle(
  initialValue: boolean,
): [boolean, (nextValue?: any) => void] {
  return useReducer(toggleReducer, initialValue);
}

export default useToggle;
