import getChatRoomListQuery from "@/features/userChat/queries/getChatRoomList";
import getChatRoomMessagesQuery from "@/features/userChat/queries/getChatRoomMessages";
import sendChatImageMessageQuery from "@/features/userChat/queries/sendChatImageMessage";
import useClientsideChatStore from "@/features/userChat/stores/useClientsideChatStore";
import { ChatMessage } from "@/mockers/chatMock";
import { getImageOriginalSize } from "@/utils/browserDOM";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getOptimisticChatMessages } from "./_utils/chatUtils";

function useSendChatImageMessage(roomId: string, sender: string) {
  const addPendingImageMessage = useClientsideChatStore(
    (state) => state.addPendingImageMessage,
  );

  const removePendingImageMessage = useClientsideChatStore(
    (state) => state.removePendingImageMessage,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    sendChatImageMessageQuery.queryKey(),
    sendChatImageMessageQuery.queryFn(roomId, sender),
    {
      onMutate: async (variables) => {
        queryClient.cancelQueries(getChatRoomMessagesQuery.queryKey(roomId));

        const filePath = URL.createObjectURL(variables.file);
        const { width, height } = await getImageOriginalSize(filePath);

        addPendingImageMessage(roomId, {
          type: "image",
          callId: variables.callId,
          filePath,
          width,
          height,
        });
      },
      onSuccess: (data) => {
        // 응답 Data로 채팅 메시지를 업데이트합니다.
        const previousChatMessages = queryClient.getQueryData(
          getChatRoomMessagesQuery.queryKey(roomId),
        ) as ChatMessage[];

        queryClient.setQueryData(
          getChatRoomMessagesQuery.queryKey(roomId),
          getOptimisticChatMessages(previousChatMessages, data),
        );

        // 채팅방 목록 및 채팅방 메시지 쿼리를 무효화합니다.
        queryClient.invalidateQueries({
          queryKey: getChatRoomListQuery.queryKey(sender),
        });

        queryClient.invalidateQueries({
          queryKey: getChatRoomMessagesQuery.queryKey(roomId),
        });
      },
      onSettled: (_data, _error, variables) => {
        removePendingImageMessage(roomId, variables.callId);
      },
    },
  );

  const sendImageMessage = useCallback(
    (file: File) => {
      if (!file) {
        return;
      }

      const callId = "MESSAGE_IMAGE_CALL_ID_" + Date.now().toString();

      return mutation.mutateAsync({ file, callId });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutation.mutateAsync],
  );

  return [sendImageMessage, mutation] as const;
}

export default useSendChatImageMessage;
