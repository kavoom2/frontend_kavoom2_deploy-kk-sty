import getChatRoomListQuery from "@/features/userChat/queries/getChatRoomList";
import getChatRoomMessagesQuery from "@/features/userChat/queries/getChatRoomMessages";
import sendChatTextMessageQuery from "@/features/userChat/queries/sendChatTextMessage";
import useClientsideChatStore from "@/features/userChat/stores/useClientsideChatStore";
import { ChatMessage } from "@/mockers/chatMock";
import { mainElementScrollToBottom } from "@/utils/layoutDOM";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getOptimisticChatMessages } from "./_utils/chatUtils";

function useSendChatTextMessage(roomId: string, sender: string) {
  const addPendingTextMessage = useClientsideChatStore(
    (state) => state.addPendingTextMessage,
  );
  const removePendingMessage = useClientsideChatStore(
    (state) => state.removePendingMessage,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    sendChatTextMessageQuery.queryKey(),
    sendChatTextMessageQuery.queryFn(roomId, sender),
    {
      onMutate: (variables) => {
        queryClient.cancelQueries(getChatRoomMessagesQuery.queryKey(roomId));

        addPendingTextMessage(roomId, {
          type: "text",
          text: variables.text,
          callId: variables.callId,
        });

        mainElementScrollToBottom();
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
          refetchType: "none",
        });

        queryClient.invalidateQueries({
          queryKey: getChatRoomMessagesQuery.queryKey(roomId),
        });
      },
      onSettled: (_data, _error, variables) => {
        removePendingMessage(roomId, variables.callId);
      },
    },
  );

  const sendTextMessage = useCallback(
    (text: string) => {
      if (!text) {
        return;
      }

      const callId = Date.now().toString();

      return mutation.mutateAsync({ text, callId });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutation.mutateAsync],
  );

  return [sendTextMessage, mutation] as const;
}

export default useSendChatTextMessage;
