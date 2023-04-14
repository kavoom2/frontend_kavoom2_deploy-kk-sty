import { renderHook } from "@testing-library/react-hooks";
import useDidUpdate from "../useDidUpdate";

describe("useDidUpdate", () => {
  it("useDidUpdate는 초기 Mount 이후에만 effectCb를 실행합니다.", () => {
    const effectCb = jest.fn();
    const { rerender } = renderHook(() => useDidUpdate(effectCb));

    expect(effectCb).not.toHaveBeenCalled();

    rerender();
    expect(effectCb).toHaveBeenCalled();
  });

  it("useDidUpdate는 deps가 변경되었을 때만 effectCb를 실행합니다.", () => {
    const effectCb = jest.fn();
    const { rerender } = renderHook((deps) => useDidUpdate(effectCb, deps), {
      initialProps: [1],
    });

    expect(effectCb).not.toHaveBeenCalled();

    rerender([1]);
    expect(effectCb).not.toHaveBeenCalled();

    rerender([2]);
    expect(effectCb).toHaveBeenCalledTimes(1);

    rerender([3]);
    expect(effectCb).toHaveBeenCalledTimes(2);
  });
});
