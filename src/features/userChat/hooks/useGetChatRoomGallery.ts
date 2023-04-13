import getChatRoomMessagesQuery from "@/features/userChat/queries/getChatRoomMessages";
import { ChatMessage } from "@/mockers/chatMock";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type GalleryImage = Pick<ChatMessage, "id" | "timestamp"> & {
  filePath: string;
};

type GetChatRoomMessageQuerySelector<TData = ChatMessage[]> = (
  data: TData,
) => GalleryImage[];

function useGetChatRoomGallery(roomId: string) {
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
        const galleryImageList: GalleryImage[] = [];

        data.forEach((item) => {
          if (item.message.type === "image") {
            galleryImageList.push({
              id: item.id,
              timestamp: item.timestamp,
              filePath: item.message.filePath,
            });
          }
        });

        return galleryImageList;
      }, []),
    },
  );

  return getQuery;
}

export default useGetChatRoomGallery;
