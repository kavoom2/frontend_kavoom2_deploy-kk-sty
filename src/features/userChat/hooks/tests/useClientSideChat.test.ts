import { act, renderHook } from "@testing-library/react-hooks";
import useClientsideChatStore from "../../stores/useClientsideChatStore";
import useClientSideChat from "../useClientSideChat";

describe("useClientSideChat", () => {
  it("useClientSideChat은 채팅방을 초기화합니다.", () => {
    const { result } = renderHook(() => useClientSideChat("1"));

    expect(result.current).toEqual({
      lastMessageRequsetedAt: null,
      messages: [],
    });
  });

  it("useClientSideChat은 채팅방이 존재하지 않을 때만 채팅방을 초기화합니다.", () => {
    const { result } = renderHook(() => useClientSideChat("1"));
    const { addPendingTextMessage } = useClientsideChatStore.getState();

    act(() => {
      addPendingTextMessage("1", {
        callId: "1",
        type: "text",
        text: "안녕하세요",
      });
    });

    const { result: result2 } = renderHook(() => useClientSideChat("1"));

    expect(result.current).toEqual({
      lastMessageRequsetedAt: expect.any(Number),
      messages: [
        {
          callId: "1",
          type: "text",
          text: "안녕하세요",
        },
      ],
    });

    expect(result2.current).toEqual({
      lastMessageRequsetedAt: expect.any(Number),
      messages: [
        {
          callId: "1",
          type: "text",
          text: "안녕하세요",
        },
      ],
    });
  });
});
