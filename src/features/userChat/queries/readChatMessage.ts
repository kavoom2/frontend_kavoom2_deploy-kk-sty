import { readMessage } from "@/mockers/chatMock";

export const readChatMessageQuery = {
  queryKey: () => {
    return "readChatMessage";
  },
  queryFn: (roomId: string, userId: string, message: string) => {
    return readMessage(roomId, userId, message);
  },
};

export default readChatMessageQuery;
