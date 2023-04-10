type TextMessage = {
  type: "text";
  text: string;
};

type ImageMessage = {
  type: "image";
  filePath: string;
  fileType: string;
};

type ChatMessage =
  | {
      id: string;
      sender: string;
      senderName: string;
      senderProfilePicture: string;
      messageType: TextMessage["type"];
      message: TextMessage;
      timestamp: number;
      readBy: string[];
    }
  | {
      id: string;
      sender: string;
      senderName: string;
      senderProfilePicture: string;
      messageType: ImageMessage["type"];
      message: ImageMessage;
      timestamp: number;
      readBy: string[];
    };

type ChatRoomData = {
  roomName: string;
  users: string[];
  messages: ChatMessage[];
};

type UserData = {
  name: string;
  profilePicture: string;
};

const userDatas: Record<string, UserData> = {
  "user-0": {
    name: "John Doe",
    profilePicture: "",
  },
  "user-1": {
    name: "Jane Doe",
    profilePicture: "",
  },
  "user-2": {
    name: "John Smith",
    profilePicture: "",
  },
};

const chatRoomsDatas: Record<string, ChatRoomData> = {
  "room-1": {
    roomName: "John Doe",
    users: ["user-0", "user-1"],
    messages: [
      {
        id: "message-123",
        sender: "user-1",
        senderName: "John Doe",
        senderProfilePicture: "",
        messageType: "text",
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: 1649443200,
        readBy: ["user-1", "user-0"],
      },
      {
        id: "message-124",
        sender: "user-1",
        senderName: "John Doe",
        senderProfilePicture: "",
        messageType: "text",
        message: {
          type: "text",
          text: "Not much, just hanging out",
        },
        timestamp: 1649443500,
        readBy: ["user-1", "user-0"],
      },
      {
        id: "message-125",
        sender: "user-1",
        senderName: "John Doe",
        senderProfilePicture: "",
        messageType: "text",
        message: {
          type: "text",
          text: "What about you?",
        },
        timestamp: 1649443800,
        readBy: ["user-1"],
      },
    ],
  },
  "room-2": {
    roomName: "John Smith",
    users: ["user-0", "user-2"],
    messages: [
      {
        id: "message-200",
        sender: "user-2",
        senderName: "John Doe",
        senderProfilePicture: "",
        messageType: "text",
        message: {
          type: "text",
          text: "Hey, what's up?",
        },
        timestamp: 1649404800,
        readBy: ["user-2"],
      },
    ],
  },
};

type ChatRoom = {
  id: string;
  lastMessage: string;
  users: {
    id: string;
    name: string;
    profilePicture: string;
  }[];
  lastMessageTimestamp: number;
  unreadMessages?: number;
};

/**
 * Mockup: 사용자의 채팅방 목록을 가져옵니다.
 *
 * @param userId 사용자 ID
 */
const getChatRoomList = (userId: string) => {
  const chatRoomList: ChatRoom[] = [];

  Object.entries(chatRoomsDatas).forEach(([roomId, roomData]) => {
    if (roomData.users.includes(userId)) {
      const lastMessage = roomData.messages[roomData.messages.length - 1];
      const unreadMessages = roomData.messages.filter(
        (message) =>
          !message.readBy.includes(userId) && message.sender !== userId,
      ).length;

      const lastMessageText =
        lastMessage.messageType === "text"
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
        unreadMessages: unreadMessages > 0 ? unreadMessages : undefined,
      });
    }
  });

  return chatRoomList;
};

/**
 * Mockup : 채팅방 정보를 가져옵니다.
 *
 * @param roomId 채팅방 ID
 */
const getChatRoomInfo = async (roomId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // 200ms 지연

  const chatRoom = chatRoomsDatas[roomId];

  return {
    roomName: chatRoom.roomName,
    users: chatRoom.users.map((id) => ({
      id,
      name: userDatas[id].name,
      profilePicture: userDatas[id].profilePicture,
    })),
  };
};

/**
 * Mockup: 채팅방의 메시지 목록을 가져옵니다.
 *
 * @param roomId 채팅방 ID
 */
const getChatRoomMessages = async (roomId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // 200ms 지연

  const chatRoom = chatRoomsDatas[roomId];

  return chatRoom.messages.map((message) => ({
    id: message.id,
    sender: message.sender,
    senderName: message.senderName,
    senderProfilePicture: message.senderProfilePicture,
    messageType: message.messageType,
    message: message.message,
    timestamp: message.timestamp,
    readBy: message.readBy,
  }));
};

/**
 * Mockup: 채팅방에 메시지를 보냅니다.
 *
 * @param roomId 채팅방 ID
 * @param sender 메시지를 보낸 사용자 ID
 * @param text 메시지 내용
 */
const sendTextMessage = async (
  roomId: string,
  sender: string,
  text: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms 지연

  const timestamp = Date.now();

  const message: ChatMessage = {
    id: `message-${timestamp}`,
    sender,
    senderName: userDatas[sender].name,
    senderProfilePicture: userDatas[sender].profilePicture,
    messageType: "text",
    message: {
      type: "text",
      text,
    },
    timestamp: timestamp,
    readBy: [sender],
  };

  chatRoomsDatas[roomId].messages.push(message);
};

/**
 *
 * @param roomId 채팅방 ID
 * @param sender 메시지를 보낸 사용자 ID
 * @param filePath 파일
 * @param fileType 파일 타입
 */
const sendImageMessage = async (
  roomId: string,
  sender: string,
  file: File,
  fileType: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms 지연

  const timestamp = Date.now();
  const filePath = URL.createObjectURL(file); // 목업 데이터이므로 ObjectURL을 사용합니다.

  const message: ChatMessage = {
    id: `message-${timestamp}`,
    sender,
    senderName: userDatas[sender].name,
    senderProfilePicture: userDatas[sender].profilePicture,
    messageType: "image",
    message: {
      type: "image",
      filePath: filePath,
      fileType: fileType,
    },
    timestamp: timestamp,
    readBy: [sender],
  };

  chatRoomsDatas[roomId].messages.push(message);
};
