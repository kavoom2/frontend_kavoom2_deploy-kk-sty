import { sendImageMessage } from "@/mockers/chatMock";

export const sendChatImageMessageQuery = {
  queryKey: () => {
    return ["sendChatImageMessage"];
  },
  queryFn: (roomId: string, sender: string) => {
    return async function (variables: { callId: string; file: File }) {
      return await sendImageMessage(roomId, sender, variables.file);
    };
  },
};

export default sendChatImageMessageQuery;
