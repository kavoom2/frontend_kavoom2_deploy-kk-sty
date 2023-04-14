import { useEffect, useRef } from "react";

const useDidUpdate = (
  effectCb: React.EffectCallback,
  deps?: React.DependencyList,
) => {
  const isMountedRef = useRef(false);

  useEffect(
    () => {
      if (isMountedRef.current) {
        effectCb && effectCb();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      /**
       * React18에서 동시성 모드가 추가됨에 따라 StrictMode를 사용하면
       * 처음으로 Mount될 때 모든 요소를 Unmount하고 다시 Mount합니다.
       * 즉, effect와 cleanup이 두 번씩 실행됩니다.
       *
       * @see https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state
       */
      isMountedRef.current = false;
    };
  }, []);
};

export default useDidUpdate;
