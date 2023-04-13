import { ImageMessage, TextMessage } from "@/mockers/chatMock";
import create from "zustand";

type PendingTextMessage = TextMessage & {
  callId: string;
};

type PendingImageMessage = ImageMessage & {
  callId: string;
};

export type ClientSideChatRoom = {
  /**
   * 마지막으로 메시지를 요청한 시간입니다.
   */
  lastMessageRequsetedAt: number | null;
  /**
   * 클라이언트에서 전송 중인 메시지 목록입니다.
   */
  messages: (PendingTextMessage | PendingImageMessage)[];
};

export interface ClientsideChatStore {
  /**
   * 클라이언트에서 사용할 채팅방에 대한 로컬 데이터입니다.
   */
  roomMap: {
    [roomId: string]: ClientSideChatRoom;
  };

  /**
   * 클라이언트에서 해당 채팅방에 사용할 로컬 데이터를 초기화합니다.
   */
  initClientChatRoom: (roomId: string) => void;

  /**
   * 클라이언트가 서버에 텍스트 메시지를 보내고 있는 동안, 해당 메시지를 로컬 데이터에 추가합니다.
   */
  addPendingTextMessage: (roomId: string, message: PendingTextMessage) => void;

  /**
   * 클라이언트가 서버에 이미지 메시지를 보내고 있는 동안, 해당 메시지를 로컬 데이터에 추가합니다.
   */
  addPendingImageMessage: (
    roomId: string,
    message: PendingImageMessage,
  ) => void;

  /**
   * 서버로부터 특정 ID의 메시지를 받으면 해당 메시지를 로컬 데이터에서 제거합니다. (텍스트 메시지 전송 시)
   */
  removePendingTextMessage: (roomId: string, callId: string) => void;

  /**
   * 서버로부터 특정 ID의 메시지를 받으면 해당 메시지를 로컬 데이터에서 제거합니다. (이미지 메시지 전송 시)
   */
  removePendingImageMessage: (roomId: string, callId: string) => void;

  /**
   * 클라이언트에서 해당 채팅방의 로컬 데이터를 제거합니다.
   */
  destroyClientChatRoom: (roomId: string) => void;
}

const useClientsideChatStore = create<ClientsideChatStore>((set, get) => {
  return {
    roomMap: {},

    initClientChatRoom: (roomId: string) => {
      const chatRoomExist = get().roomMap[roomId];

      if (chatRoomExist) {
        return;
      }

      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            lastMessageRequsetedAt: null,
            messages: [],
          },
        };

        return { roomMap };
      });
    },

    addPendingTextMessage: (roomId: string, message: PendingTextMessage) => {
      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            ...state.roomMap[roomId],
            lastMessageRequsetedAt: Date.now(),
            messages: [...state.roomMap[roomId].messages, message],
          },
        };

        return { roomMap };
      });
    },

    addPendingImageMessage: (roomId: string, message: PendingImageMessage) => {
      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            ...state.roomMap[roomId],
            lastMessageRequsetedAt: Date.now(),
            messages: [...state.roomMap[roomId].messages, message],
          },
        };

        return { roomMap };
      });
    },

    removePendingTextMessage: (roomId: string, callId: string) => {
      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            ...state.roomMap[roomId],
            messages: state.roomMap[roomId].messages.filter((message) => {
              if (message.type !== "text") {
                return true;
              }

              return message.callId !== callId;
            }),
          },
        };

        return { roomMap };
      });
    },

    removePendingImageMessage: (roomId: string, callId: string) => {
      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            ...state.roomMap[roomId],
            messages: state.roomMap[roomId].messages.filter((message) => {
              if (message.type !== "image") {
                return true;
              }

              const isTargetMessage = message.callId === callId;

              if (isTargetMessage) {
                // clean up: 이미지 메시지를 보낸 후, 해당 이미지를 메모리에서 제거합니다.
                URL.revokeObjectURL(message.filePath);
              }

              return !isTargetMessage;
            }),
          },
        };

        return { roomMap };
      });
    },

    destroyClientChatRoom: (roomId: string) => {
      set((state) => {
        const roomMap = { ...state.roomMap };
        delete roomMap[roomId];

        return { roomMap };
      });
    },
  };
});

export default useClientsideChatStore;
