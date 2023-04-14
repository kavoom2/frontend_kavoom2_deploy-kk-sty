import { demoRoomId, initializeMockDatas } from "@/mockers/chatMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import useGetChatRoomInfo, {
  GetChatRoomInfoQueryData,
} from "../useGetChatRoomInfo";

describe("useGetChatRoomInfo", () => {
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
      () => useGetChatRoomInfo(demoRoomId),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess, {
      timeout: 100000,
    });

    const data = result.current.data as GetChatRoomInfoQueryData;

    expect(data).toEqual(
      expect.objectContaining({
        roomName: expect.any(String),

        users: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            profilePicture: expect.any(String),
          }),
        ]),
      }),
    );

    Object.keys(data.userTable).forEach((userKey) => {
      expect(userKey).toBe(data.userTable[userKey].id);

      expect(data.users).toContainEqual({
        id: expect.any(String),
        name: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  });
});
