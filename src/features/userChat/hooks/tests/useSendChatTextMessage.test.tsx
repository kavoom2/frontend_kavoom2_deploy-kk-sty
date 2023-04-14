import {
  demoRoomId,
  demoUserId,
  initializeMockDatas,
} from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";
import useSendChatTextMessage from "../useSendChatTextMessage";

describe("useSendChatTextMessage", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    initializeMockDatas();
    queryClient.clear();
  });

  it("useSendChatTextMessage는 채팅방에 텍스트 메시지를 게시합니다.", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useSendChatTextMessage(demoRoomId, demoUserId),
      {
        wrapper,
      },
    );

    act(() => {
      result.current[1].mutateAsync({
        callId: "test",
        text: "test",
      });
    });

    await waitForNextUpdate();
    expect(result.current[1].isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current[1].isSuccess).toBe(true);
  });
});
