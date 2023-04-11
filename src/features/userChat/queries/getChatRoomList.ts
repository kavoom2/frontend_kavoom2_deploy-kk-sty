import { getChatRoomList } from "@/mockers/chatMock";

const getChatRoomListQuery = {
  queryKey: (userId: string) => {
    const queryKey = ["chatRoomList"];

    if (userId) {
      queryKey.push(userId);
    }

    return queryKey;
  },
  queryFn: (userId: string) => {
    return async function () {
      const chatList = await getChatRoomList(userId);

      return chatList;
    };
  },
};

export default getChatRoomListQuery;
