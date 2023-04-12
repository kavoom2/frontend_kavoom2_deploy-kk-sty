import { sendTextMessage } from "@/mockers/chatMock";

export const sendChatTextMessageQuery = {
  queryKey: () => {
    return ["sendChatTextMessage"];
  },
  queryFn: (roomId: string, sender: string) => {
    return async function (variables: { text: string; callId: string }) {
      return await sendTextMessage(roomId, sender, variables.text);
    };
  },
};

export default sendChatTextMessageQuery;
