import { act, renderHook } from "@testing-library/react-hooks";
import useClientsideChatStore from "../useClientsideChatStore";

URL.createObjectURL = jest.fn();
URL.revokeObjectURL = jest.fn();

describe("useClientsideChatStore", () => {
  const initialStoreState = useClientsideChatStore.getState();

  afterEach(() => {
    act(() => {
      useClientsideChatStore.setState(initialStoreState, true);
    });
  });

  it("initCLientChatRoom은 채팅방을 초기화합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom } = result.current;

    expect(result.current.roomMap).toEqual({});

    act(() => {
      initClientChatRoom("1");
    });

    expect(result.current.roomMap).toEqual({
      "1": {
        lastMessageRequsetedAt: null,
        messages: [],
      },
    });
  });

  it("initClientChatRoom은 채팅방이 존재하지 않을 때만 채팅방을 초기화합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom, addPendingTextMessage } = result.current;

    expect(result.current.roomMap).toEqual({});

    act(() => {
      initClientChatRoom("1");
    });

    expect(result.current.roomMap).toEqual({
      "1": {
        lastMessageRequsetedAt: null,
        messages: [],
      },
    });

    act(() => {
      addPendingTextMessage("1", {
        callId: "1",
        type: "text",
        text: "안녕하세요",
      });

      initClientChatRoom("1");
    });

    expect(result.current.roomMap).toEqual({
      "1": {
        lastMessageRequsetedAt: expect.any(Number),
        messages: [
          {
            callId: "1",
            type: "text",
            text: "안녕하세요",
          },
        ],
      },
    });
  });

  it("addPendingTextMessage는 전송 요청이 완료되지 않은 메시지를 추가합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom, addPendingTextMessage } = result.current;

    act(() => {
      initClientChatRoom("1");

      addPendingTextMessage("1", {
        callId: "1",
        type: "text",
        text: "안녕하세요",
      });
    });

    expect(result.current.roomMap).toEqual({
      "1": {
        lastMessageRequsetedAt: expect.any(Number),
        messages: [
          {
            callId: "1",
            type: "text",
            text: "안녕하세요",
          },
        ],
      },
    });
  });

  it("removePendingTextMessage는 전송 요청이 완료되지 않은 메시지를 제거합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const {
      initClientChatRoom,
      addPendingTextMessage,
      removePendingTextMessage,
    } = result.current;

    act(() => {
      initClientChatRoom("1");

      addPendingTextMessage("1", {
        callId: "1",
        type: "text",
        text: "안녕하세요",
      });

      removePendingTextMessage("1", "1");
    });

    expect(result.current.roomMap).toMatchObject({
      "1": {
        messages: [],
      },
    });
  });

  it("addPendingImageMessage는 전송 요청이 완료되지 않은 이미지 메시지를 추가합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom, addPendingImageMessage } = result.current;

    act(() => {
      initClientChatRoom("1");

      addPendingImageMessage("1", {
        callId: "1",
        type: "image",
        filePath: "filePath",
        width: 100,
        height: 100,
      });
    });

    expect(result.current.roomMap).toEqual({
      "1": {
        lastMessageRequsetedAt: expect.any(Number),
        messages: [
          {
            callId: "1",
            type: "image",
            filePath: "filePath",
            width: 100,
            height: 100,
          },
        ],
      },
    });
  });

  it("removePendingImageMessage는 전송 요청이 완료되지 않은 이미지 메시지를 제거합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const {
      initClientChatRoom,

      addPendingImageMessage,
      removePendingImageMessage,
    } = result.current;

    act(() => {
      initClientChatRoom("1");

      addPendingImageMessage("1", {
        callId: "1",
        type: "image",
        filePath: "filePath",
        width: 100,
        height: 100,
      });

      removePendingImageMessage("1", "1");
    });

    expect(result.current.roomMap).toMatchObject({
      "1": {
        messages: [],
      },
    });
  });

  it('메시지를 추가하면 "lastMessageRequsetedAt"이 갱신됩니다.', () => {
    let lastMessageRequsetedAt = null;
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom, addPendingTextMessage } = result.current;

    act(() => {
      initClientChatRoom("1");

      addPendingTextMessage("1", {
        callId: "1",
        type: "text",
        text: "안녕하세요",
      });
    });

    lastMessageRequsetedAt = result.current.roomMap["1"]
      .lastMessageRequsetedAt as number;

    expect(result.current.roomMap).toMatchObject({
      "1": {
        lastMessageRequsetedAt: expect.any(Number),
      },
    });

    act(() => {
      addPendingTextMessage("1", {
        callId: "2",
        type: "text",
        text: "안녕하세요",
      });
    });

    expect(result.current.roomMap[1].lastMessageRequsetedAt).toBeGreaterThan(
      lastMessageRequsetedAt,
    );
  });

  it("destroyClientChatRoom은 채팅방을 제거합니다.", () => {
    const { result } = renderHook(() => useClientsideChatStore());
    const { initClientChatRoom, destroyClientChatRoom } = result.current;

    act(() => {
      initClientChatRoom("1");
      destroyClientChatRoom("1");
    });

    expect(result.current.roomMap).toEqual({});
  });
});
