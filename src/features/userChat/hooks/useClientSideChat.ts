import useClientsideChatStore from "@/features/userChat/stores/useClientsideChatStore";

function useClientSideChat(roomId: string) {
  const roomMap = useClientsideChatStore((state) => state.roomMap);
  const room = roomMap[roomId] || { messages: [] };

  return room;
}

export default useClientSideChat;