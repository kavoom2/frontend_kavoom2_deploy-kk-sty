import { sendImageMessage } from "@/mockers/chatMock";

export const sendChatImageMessageQuery = {
  queryKey: () => {
    return "sendChatImageMessage";
  },
  queryFn: (roomId: string, sender: string, file: File) => {
    return sendImageMessage(roomId, sender, file);
  },
};

export default sendChatImageMessageQuery;
