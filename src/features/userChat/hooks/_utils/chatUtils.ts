import { ChatMessage } from "@/mockers/chatMock";

export function getOptimisticChatMessages(
  prevChatMessages: ChatMessage[],
  newChatMessage: ChatMessage,
) {
  const optimisticChatMessages = [...prevChatMessages, newChatMessage];

  return optimisticChatMessages.sort((a, b) => {
    const aTime = new Date(a.timestamp);
    const bTime = new Date(b.timestamp);

    return aTime.getTime() - bTime.getTime() > 0 ? 1 : -1;
  });
}
