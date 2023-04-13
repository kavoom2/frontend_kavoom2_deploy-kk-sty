export function getLayoutMainElement() {
  return document.querySelector("#layout-main");
}

export function scrollToBottom(element: Element | null) {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

export function mainElementScrollToBottom() {
  const mainElement = getLayoutMainElement();
  scrollToBottom(mainElement);
}
