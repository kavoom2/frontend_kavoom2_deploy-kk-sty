import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useCallback, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

type ElementRect = Pick<
  DOMRect,
  "x" | "y" | "width" | "height" | "top" | "left" | "bottom" | "right"
>;

type RefFunction<T> = (instance: T | null) => void;

const defaultRect: ElementRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const useMeasure = () => {
  const [element, setElement] = useState<Element | null>(null);
  const [rect, setRect] = useState<ElementRect>(defaultRect);

  const resizeObserverRef = useRef(
    new ResizeObserver((entries) => {
      if (entries[0]) {
        const { x, y, width, height, top, left, bottom, right } =
          entries[0].contentRect;

        setRect({ x, y, width, height, top, left, bottom, right });
      }
    }),
  );

  const elementRef = useCallback<RefFunction<Element>>((_ref) => {
    setElement(_ref);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!element) return;

    resizeObserverRef.current.observe(element);

    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, [element]);

  return [elementRef, rect] as const;
};

export default useMeasure;
