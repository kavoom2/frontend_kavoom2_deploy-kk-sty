import { isIosDevice } from "@/utils/device";
import { useEffect } from "react";

const useVisualViewport = () => {
  useEffect(() => {
    if (window.visualViewport == null || !isIosDevice) return;
    const viewport = window.visualViewport as VisualViewport;

    const onResize = () => {
      const { height } = viewport;
      document.body.style.height = `${height}px`;
    };

    const onScroll = (event: Event) => {
      event.preventDefault();
      window.scrollTo(0, 0);
    };

    viewport.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: false });

    return () => {
      viewport.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};

export default useVisualViewport;
