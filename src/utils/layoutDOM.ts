export function getLayoutMainElement() {
  return document.querySelector("#layout-main");
}

export function scrollToBottom(element: Element) {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

export function mainElementScrollToBottom() {
  const mainElement = getLayoutMainElement();

  if (mainElement) {
    scrollToBottom(mainElement);
  }
}
