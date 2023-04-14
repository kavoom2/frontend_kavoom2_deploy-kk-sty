import {
  demoRoomId,
  demoUserId,
  initializeMockDatas,
} from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react-hooks";
import useSendChatImageMessage from "../useSendChatImageMessage";

URL.createObjectURL = jest.fn().mockImplementation((file: File) => "test");
URL.revokeObjectURL = jest.fn();

jest.mock("@/utils/browserDOM", () => {
  const originalModule = jest.requireActual("@/utils/browserDOM");

  return {
    ...originalModule,
    getImageOriginalSize: jest.fn().mockImplementation(() => ({
      width: 100,
      height: 100,
    })),
  };
});

jest.mock("@/mockers/chatMock", () => {
  const originalModule = jest.requireActual("@/mockers/chatMock");

  return {
    ...originalModule,
    sendImageMessage: jest.fn().mockImplementation(() => {
      return {
        id: "test",
        sender: "test",
        message: {
          type: "image",
          filePath: "test",
          width: 100,
          height: 100,
        },
        timestamp: "test",
        readBy: [],
      };
    }),
  };
});

describe("useSendChatImageMessage", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    initializeMockDatas();
    queryClient.clear();
  });

  it("useSendChatImageMessage는 채팅방에 이미지 메시지를 게시합니다.", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useSendChatImageMessage(demoRoomId, demoUserId),
      {
        wrapper,
      },
    );

    act(() => {
      result.current[1].mutateAsync({
        file: new File([""], "test.png", { type: "image/png" }),
        callId: "test",
      });
    });

    await waitForNextUpdate();
    expect(result.current[1].isSuccess).toBe(true);
  });
});
