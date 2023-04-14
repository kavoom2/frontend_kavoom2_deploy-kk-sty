import getChatRoomListQuery from "@/features/userChat/queries/getChatRoomList";
import { ChatRoom } from "@/mockers/chatMock";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export type GetChatRoomListQuerySelector<TData = ChatRoom[]> = (
  data: TData,
) => TData;

function useGetChatRoomList(userId: string) {
  const getQuery = useQuery(
    getChatRoomListQuery.queryKey(userId),
    getChatRoomListQuery.queryFn(userId),
    {
      enabled: !!userId,

      staleTime: 1000 * 20,
      cacheTime: 1000 * 20,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,

      select: useCallback<GetChatRoomListQuerySelector>((data) => {
        const chatListSortedByTime = data.sort((a, b) => {
          const aTime = new Date(a.lastMessageTimestamp);
          const bTime = new Date(b.lastMessageTimestamp);

          const aTimeMs = aTime.getTime();
          const bTimeMs = bTime.getTime();

          if (aTimeMs === bTimeMs) {
            return b.unreadMessages > a.unreadMessages ? 1 : -1;
          }

          return bTimeMs > aTimeMs ? 1 : -1;
        });

        return chatListSortedByTime;
      }, []),
    },
  );

  return getQuery;
}

export default useGetChatRoomList;
