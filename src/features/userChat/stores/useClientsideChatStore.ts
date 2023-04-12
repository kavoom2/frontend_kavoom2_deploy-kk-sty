import { ImageMessage, TextMessage } from "@/mockers/chatMock";
import create from "zustand";

type PendingTextMessage = TextMessage & {
  callId: string;
};

type PendingImageMessage = ImageMessage & {
  callId: string;
};

export interface ClientsideChatStore {
  /**
   * 클라이언트에서 사용할 채팅방에 대한 로컬 데이터입니다.
   */
  roomMap: {
    [roomId: string]: {
      messages: (PendingTextMessage | PendingImageMessage)[];
    };
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
   * 서버로부터 특정 ID의 메시지를 받으면 해당 메시지를 로컬 데이터에서 제거합니다.
   */
  removePendingMessage: (roomId: string, callId: string) => void;

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
            messages: [...state.roomMap[roomId].messages, message],
          },
        };

        return { roomMap };
      });
    },

    removePendingMessage: (roomId: string, callId: string) => {
      set((state) => {
        const roomMap = {
          ...state.roomMap,
          [roomId]: {
            messages: state.roomMap[roomId].messages.filter(
              (message) => message.callId !== callId,
            ),
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
