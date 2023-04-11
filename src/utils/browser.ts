export const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const URL = canUseDom ? window.URL || window.webkitURL : undefined;
