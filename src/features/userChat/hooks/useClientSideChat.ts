import useClientsideChatStore, {
  createInitialClientChatRoom,
} from "@/features/userChat/stores/useClientsideChatStore";
import { useEffect } from "react";

function useClientSideChat(roomId: string) {
  const roomMap = useClientsideChatStore((state) => state.roomMap);

  const initClientChatRoom = useClientsideChatStore(
    (state) => state.initClientChatRoom,
  );

  const room = roomMap[roomId] || createInitialClientChatRoom();

  useEffect(() => {
    roomId && initClientChatRoom(roomId);
  }, [roomId, initClientChatRoom]);

  return room;
}

export default useClientSideChat;
