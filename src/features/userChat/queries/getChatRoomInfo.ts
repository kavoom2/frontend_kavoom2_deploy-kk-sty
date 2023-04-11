import { getChatRoomInfo } from "@/mockers/chatMock";

const getChatRoomInfoQuery = {
  queryKey: (roomId: string) => {
    const queryKey = ["chatRoomInfo"];

    if (roomId) {
      queryKey.push(roomId);
    }

    return queryKey;
  },
  queryFn: (roomId: string) => {
    return async function () {
      const chatRoomInfo = await getChatRoomInfo(roomId);

      return chatRoomInfo;
    };
  },
};

export default getChatRoomInfoQuery;
