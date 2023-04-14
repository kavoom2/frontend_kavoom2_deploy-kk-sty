import { demoUserId, initializeMockDatas } from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import useGetChatRoomList from "../useGetChatRoomList";

describe("useGetChatRoomList", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    initializeMockDatas();
    queryClient.clear();
  });

  it("useGetChatRoomInfo는 채팅방 정보를 가져옵니다.", async () => {
    const { result, waitFor } = renderHook(
      () => useGetChatRoomList(demoUserId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    expect(result.current.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          lastMessage: expect.any(String),
          lastMessageTimestamp: expect.any(String),
          unreadMessages: expect.any(Number),
        }),
      ]),
    );
  });
});
