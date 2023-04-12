import { getTimestamp } from "@/utils/dateFormatter";

export type TextMessage = {
  type: "text";
  text: string;
};

export type ImageMessage = {
  type: "image";
  filePath: string;
};

export type ChatMessage =
  | {
      id: string;
      sender: string;
      message: TextMessage;
      timestamp: string;
      readBy: string[];
    }
  | {
      id: string;
      sender: string;
      message: ImageMessage;
      timestamp: string;
      readBy: string[];
    };

export type ChatRoomData = {
  roomName: string;
  users: string[];
  messages: ChatMessage[];
};

export type UserData = {
  name: string;
  profilePicture: string;
};

export const demoUserId = "user-0";

const userDatas: Record<string, UserData> = {
  [demoUserId]: {
    name: "John Doe",
    profilePicture: "https://avatars.githubusercontent.com/u/22580992?v=4",
  },
  "user-1": {
    name: "Marry",
    profilePicture: "https://avatars.githubusercontent.com/u/22580993?v=4",
  },
  "user-2": {
    name: "George",
    profilePicture: "https://avatars.githubusercontent.com/u/22580994?v=4",
  },
};

const chatRoomsDatas: Record<string, ChatRoomData> = {
  "room-1": {
    roomName: userDatas["user-1"].name,
    users: [demoUserId, "user-1"],
    messages: [
      {
        id: "message-122",
        sender: demoUserId,
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: "2023-04-10T21:15:00.000Z",
        readBy: ["user-1", demoUserId],
      },
      {
        id: "message-123",
        sender: "user-1",
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: "2023-04-11T13:15:00.000Z",
        readBy: ["user-1", demoUserId],
      },
      {
        id: "message-124",
        sender: demoUserId,
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: "2023-04-11T13:15:30.000Z",
        readBy: ["user-1", demoUserId],
      },
      {
        id: "message-125",
        sender: demoUserId,
        message: {
          type: "text",
          text: "Not much, just hanging out",
        },
        timestamp: "2023-04-11T13:16:30.000Z",
        readBy: ["user-1", demoUserId],
      },
      {
        id: "message-126",
        sender: "user-1",
        message: {
          type: "text",
          text: "What about you?",
        },
        timestamp: "2023-04-11T13:18:00.000Z",
        readBy: ["user-1"],
      },
      {
        id: "message-127",
        sender: "user-1",
        message: {
          type: "text",
          text: "What about you?",
        },
        timestamp: "2023-04-11T13:18:00.000Z",
        readBy: ["user-1"],
      },
      {
        id: "message-128",
        sender: "user-1",
        message: {
          type: "text",
          text: "What about you?",
        },
        timestamp: "2023-04-11T13:19:01.000Z",
        readBy: ["user-1"],
      },
      {
        id: "message-129",
        sender: "user-1",
        message: {
          type: "text",
          text: "What about you?",
        },
        timestamp: "2023-04-12T03:00:01.000Z",
        readBy: ["user-1"],
      },
    ],
  },
  "room-2": {
    roomName: userDatas["user-2"].name,
    users: [demoUserId, "user-2"],
    messages: [
      {
        id: "message-200",
        sender: "user-2",
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: "2023-04-10T13:16:10.000Z",
        readBy: ["user-2"],
      },
      {
        id: "message-201",
        sender: "user-2",
        message: {
          type: "image",
          filePath: "https://avatars.githubusercontent.com/u/22580992?v=4",
        },
        timestamp: "2023-04-10T13:16:30.000Z",
        readBy: ["user-2"],
      },
    ],
  },
};

export type ChatRoom = {
  id: string;
  lastMessage: string;
  users: {
    id: string;
    name: string;
    profilePicture: string;
  }[];
  lastMessageTimestamp: string;
  unreadMessages: number;
};

/**
 * Mockup: 사용자의 채팅방 목록을 가져옵니다.
 *
 * @param userId 사용자 ID
 */
export const getChatRoomList = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const chatRoomList: ChatRoom[] = [];

  Object.entries(chatRoomsDatas).forEach(([roomId, roomData]) => {
    if (roomData.users.includes(userId)) {
      const lastMessage = roomData.messages[roomData.messages.length - 1];
      const unreadMessages = roomData.messages.filter(
        (message) =>
          !message.readBy.includes(userId) && message.sender !== userId,
      ).length;

      const lastMessageText =
        lastMessage.message.type === "text"
          ? lastMessage.message.text
          : "사진을 보냈습니다."; // 파일 전송시 (이미지만 허용합니다.)

      chatRoomList.push({
        id: roomId,
        lastMessage: lastMessageText,
        users: roomData.users
          .filter((id) => id !== userId)
          .map((id) => ({
            id,
            name: userDatas[id].name,
            profilePicture: userDatas[id].profilePicture,
          })),
        lastMessageTimestamp: lastMessage.timestamp,
        unreadMessages: unreadMessages > 0 ? unreadMessages : 0,
      });
    }
  });

  return chatRoomList;
};

export type ChatRoomInfo = {
  roomName: string;
  users: {
    id: string;
    name: string;
    profilePicture: string;
  }[];
};

/**
 * @param roomId 채팅방 ID
 */
export const getChatRoomInfo = async (roomId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const chatRoom = chatRoomsDatas[roomId];

  return {
    roomName: chatRoom.roomName,
    users: chatRoom.users.map((id) => ({
      id,
      name: userDatas[id].name,
      profilePicture: userDatas[id].profilePicture,
    })),
  } as ChatRoomInfo;
};

/**
 * @param roomId 채팅방 ID
 */
export const getChatRoomMessages = async (roomId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // 200ms 지연

  const chatRoom = chatRoomsDatas[roomId];

  return chatRoom.messages;
};

/**
 * @param roomId 채팅방 ID
 * @param sender 메시지를 보낸 사용자 ID
 * @param text 메시지 내용
 */
export const sendTextMessage = async (
  roomId: string,
  sender: string,
  text: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // 50ms 지연

  const timestamp = Date.now();

  const message: ChatMessage = {
    id: `message-${timestamp}`,
    sender,
    message: {
      type: "text",
      text,
    },
    timestamp: getTimestamp(timestamp),
    readBy: [sender],
  };

  chatRoomsDatas[roomId] = {
    ...chatRoomsDatas[roomId],
    messages: [...chatRoomsDatas[roomId].messages, message],
  };

  return message;
};

/**
 * @param roomId 채팅방 ID
 * @param sender 메시지를 보낸 사용자 ID
 * @param filePath 파일
 */
export const sendImageMessage = async (
  roomId: string,
  sender: string,
  file: File,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms 지연

  const timestamp = Date.now();
  const filePath = URL.createObjectURL(file); // 목업 데이터이므로 ObjectURL을 사용합니다.

  const message: ChatMessage = {
    id: `message-${timestamp}`,
    sender,
    message: {
      type: "image",
      filePath: filePath,
    },
    timestamp: getTimestamp(timestamp),
    readBy: [sender],
  };

  chatRoomsDatas[roomId] = {
    ...chatRoomsDatas[roomId],
    messages: [...chatRoomsDatas[roomId].messages, message],
  };

  return message;
};

/**
 * @param roomId 채팅방 ID
 * @param userId 사용자 ID
 * @param messageId 메시지 ID
 */
export const readMessage = async (
  roomId: string,
  userId: string,
  messageId: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms 지연
  const room = chatRoomsDatas[roomId];

  const messageIndex = room.messages.findIndex(
    (message) => message.id === messageId,
  );

  if (messageIndex === -1) {
    return false;
  }

  const nextMessage = room.messages.map((item) => {
    if (!item.readBy.includes(userId)) {
      return {
        ...item,
        readBy: [...item.readBy, userId],
      };
    }

    return item;
  });

  chatRoomsDatas[roomId] = {
    ...chatRoomsDatas[roomId],
    messages: nextMessage,
  };

  return true;
};
