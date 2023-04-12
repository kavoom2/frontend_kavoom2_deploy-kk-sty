import { useEffect } from "react";

const useDidMount = (effectCb: React.EffectCallback) => {
  useEffect(
    () => {
      effectCb && effectCb();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useDidMount;
