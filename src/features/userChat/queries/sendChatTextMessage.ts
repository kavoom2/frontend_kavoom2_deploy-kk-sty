import { sendTextMessage } from "@/mockers/chatMock";

export const sendChatTextMessageQuery = {
  queryKey: () => {
    return "sendChatTextMessage";
  },
  queryFn: (roomId: string, sender: string, message: string) => {
    return sendTextMessage(roomId, sender, message);
  },
};

export default sendChatTextMessageQuery;
