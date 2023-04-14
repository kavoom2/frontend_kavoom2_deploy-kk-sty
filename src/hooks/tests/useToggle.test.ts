import { act, renderHook } from "@testing-library/react-hooks";
import useToggle from "../useToggle";

describe("useToggle", () => {
  it("초기값을 받아서 상태값을 반환합니다.", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it("toggle 함수를 실행하면 상태값이 반전됩니다.", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it("toggle 함수는 다음 값을 받아서 상태값을 강제로 설정할 수 있습니다.", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });
});
