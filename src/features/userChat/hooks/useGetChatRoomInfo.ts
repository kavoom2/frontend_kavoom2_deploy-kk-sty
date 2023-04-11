import getChatRoomInfoQuery from "@/features/userChat/queries/getChatRoomInfo";
import { ChatRoomInfo } from "@/mockers/chatMock";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type UserTable = {
  [id: string]: {
    id: string;
    name: string;
    profilePicture: string;
  };
};

type GetChatRoomInfoQueryData = ChatRoomInfo & { userTable: UserTable };

type GetChatRoomInfoQuerySelector<TData = ChatRoomInfo> = (
  data: TData,
) => GetChatRoomInfoQueryData;

function useGetChatRoomInfo(roomId: string) {
  const getQuery = useQuery(
    getChatRoomInfoQuery.queryKey(roomId),
    getChatRoomInfoQuery.queryFn(roomId),
    {
      enabled: !!roomId,

      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,

      select: useCallback<GetChatRoomInfoQuerySelector>((data) => {
        const { roomName, users } = data;

        const userTable = users.reduce((acc, user) => {
          const { id } = user;
          acc[id] = user;

          return acc;
        }, {} as UserTable);

        return {
          roomName,
          users,
          userTable,
        };
      }, []),
    },
  );

  return getQuery;
}

export default useGetChatRoomInfo;
