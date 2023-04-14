import { demoRoomId, initializeMockDatas } from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import useGetChatRoomGallery, {
  GetChatRoomMessageQueryData,
} from "../useGetChatRoomGallery";

describe("useGetChatRoomGallery", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    initializeMockDatas();
    queryClient.clear();
  });

  it("useGetChatRoomGallery는 갤러리 정보를 가져옵니다.", async () => {
    const { result, waitFor } = renderHook(
      () => useGetChatRoomGallery(demoRoomId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    const data = result.current.data as GetChatRoomMessageQueryData;

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          filePath: expect.any(String),
          timestamp: expect.any(String),
        }),
      ]),
    );
  });
});
