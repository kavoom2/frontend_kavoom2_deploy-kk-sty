import { demoRoomId, initializeMockDatas } from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import useGetChatRoomMessages, {
  GetChatRoomMessagesQueryData,
} from "../useGetChatRoomMessages";

describe("useGetChatRoomMessages", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    initializeMockDatas();
    queryClient.clear();
  });

  it("useGetChatRoomMessages는 채팅방의 메시지 목록을 가져옵니다.", async () => {
    const { result, waitFor } = renderHook(
      () => useGetChatRoomMessages(demoRoomId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    const data = result.current.data as GetChatRoomMessagesQueryData;

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          sender: expect.any(String),
          message: expect.objectContaining({
            type: expect.any(String),
          }),
          timestamp: expect.any(String),
          sendedDate: expect.any(String),
          sendedTime: expect.any(String),
        }),
      ]),
    );
  });

  it("useGetChatRoomMessages는 채팅방의 메시지 목록을 가져올 때, 메시지의 타입이 text일 경우, message의 text 속성을 가져옵니다.", async () => {
    const { result, waitFor } = renderHook(
      () => useGetChatRoomMessages(demoRoomId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    const data = result.current.data as GetChatRoomMessagesQueryData;

    const anyTextMessage = data.find(
      (message) => message.message.type === "text",
    );

    expect(anyTextMessage).toEqual(
      expect.objectContaining({
        message: expect.objectContaining({
          text: expect.any(String),
        }),
      }),
    );
  });

  it("useGetChatRoomMessages는 채팅방의 메시지 목록을 가져올 때, 메시지의 타입이 image일 경우, message의 image 속성을 가져옵니다.", async () => {
    const { result, waitFor } = renderHook(
      () => useGetChatRoomMessages(demoRoomId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    const data = result.current.data as GetChatRoomMessagesQueryData;

    const anyImageMessage = data.find(
      (message) => message.message.type === "image",
    );

    expect(anyImageMessage).toEqual(
      expect.objectContaining({
        message: expect.objectContaining({
          filePath: expect.any(String),
          width: expect.any(Number),
          height: expect.any(Number),
        }),
      }),
    );
  });
});
