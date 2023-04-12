import getChatRoomMessagesQuery from "@/features/userChat/queries/getChatRoomMessages";
import useClientsideChatStore from "@/features/userChat/stores/useClientsideChatStore";
import { ChatMessage } from "@/mockers/chatMock";
import { getDateAndTimeFromTimestamp } from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

type ChatRoomMessage = ChatMessage & {
  sendedDate: string;
  sendedTime: string;
};

type GetChatRoomMessagesQueryData = ChatRoomMessage[];

type GetChatRoomMessageQuerySelector<TData = ChatMessage[]> = (
  data: TData,
) => GetChatRoomMessagesQueryData;

function useGetChatRoomMessages(roomId: string) {
  const initClientChatRoom = useClientsideChatStore(
    (state) => state.initClientChatRoom,
  );

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

  useEffect(() => {
    if (!roomId) {
      return;
    }

    initClientChatRoom(roomId);
  }, [roomId, initClientChatRoom]);

  return getQuery;
}

export default useGetChatRoomMessages;
