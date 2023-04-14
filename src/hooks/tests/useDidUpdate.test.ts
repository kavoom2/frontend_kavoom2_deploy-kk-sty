import { renderHook } from "@testing-library/react-hooks";
import useDidMount from "../useDidMount";

describe("useDidMount", () => {
  it("useDidMount는 최초 Mount에만 effectCb를 실행합니다.", () => {
    const effectCb = jest.fn();
    const { rerender } = renderHook(() => useDidMount(effectCb));

    expect(effectCb).toHaveBeenCalled();

    rerender();
    expect(effectCb).toHaveBeenCalledTimes(1);
  });
});
