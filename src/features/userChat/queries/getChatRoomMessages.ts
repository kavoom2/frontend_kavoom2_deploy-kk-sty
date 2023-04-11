import { getChatRoomMessages } from "@/mockers/chatMock";
import { QueryOptions } from "@tanstack/react-query";

export const getChatRoomMessagesQuery = {
  queryKey: (roomId: string) => {
    const queryKey = ["chatRoomMessages"];

    if (roomId) {
      queryKey.push(roomId);
    }

    return queryKey;
  },
  queryFn: (roomId: string) => {
    return async function () {
      const chatRoomMessages = await getChatRoomMessages(roomId);

      return chatRoomMessages;
    };
  },
  queryOptions: {
    staleTime: 1000 * 10,
    cacheTime: 1000 * 10,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  } as QueryOptions,
};

export default getChatRoomMessagesQuery;
