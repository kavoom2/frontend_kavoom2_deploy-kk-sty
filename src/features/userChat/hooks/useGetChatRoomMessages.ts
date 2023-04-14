import getChatRoomMessagesQuery from "@/features/userChat/queries/getChatRoomMessages";
import { ChatMessage } from "@/mockers/chatMock";
import { getDateAndTimeFromTimestamp } from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export type ChatRoomMessage = ChatMessage & {
  sendedDate: string;
  sendedTime: string;
};

export type GetChatRoomMessagesQueryData = ChatRoomMessage[];

export type GetChatRoomMessageQuerySelector<TData = ChatMessage[]> = (
  data: TData,
) => GetChatRoomMessagesQueryData;

function useGetChatRoomMessages(roomId: string) {
  const getQuery = useQuery(
    getChatRoomMessagesQuery.queryKey(roomId),
    getChatRoomMessagesQuery.queryFn(roomId),
    {
      enabled: !!roomId,

      staleTime: 1000 * 10,
      cacheTime: 1000 * 10,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,

      select: useCallback<GetChatRoomMessageQuerySelector>((data) => {
        const messageList = data.map((item) => {
          const { date: sendedDate, time: sendedTime } =
            getDateAndTimeFromTimestamp(item.timestamp);

          return {
            ...item,
            sendedDate,
            sendedTime,
          };
        });

        return messageList;
      }, []),
    },
  );

  return getQuery;
}

export default useGetChatRoomMessages;
