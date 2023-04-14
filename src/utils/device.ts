import { canUseDom } from "./browser";

export const isIosDevice =
  canUseDom &&
  window.navigator &&
  window.navigator.platform &&
  /iP(ad|hone|od)/.test(window.navigator.platform);
