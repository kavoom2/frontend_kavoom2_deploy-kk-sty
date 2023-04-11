import ChatRoomAligner from "@/features/userChat/components/ChatRoomAligner";
import ChatRoomDateDivider from "@/features/userChat/components/ChatRoomDateDivider";
import ChatRoomLayout from "@/features/userChat/components/ChatRoomLayout";
import ChatRoomMessageSpacer from "@/features/userChat/components/ChatRoomMessageSpacer";
import ChatTextMessageBox from "@/features/userChat/components/ChatTextMessageBox";
import useGetChatRoomInfo from "@/features/userChat/hooks/useGetChatRoomInfo";
import useGetChatRoomMessages from "@/features/userChat/hooks/useGetChatRoomMessages";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

import { demoUserId } from "@/mockers/chatMock";
import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const params = useParams();
  const roomId = params.roomId as string;

  const getChatRoomInfoQuery = useGetChatRoomInfo(roomId);
  const headline = getChatRoomInfoQuery.data?.roomName;

  return (
    <>
      <TopAppBar headline={headline} />
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export const Component = () => {
  const currentUser = demoUserId;
  const params = useParams();
  const roomId = params.roomId as string;

  const getChatRoomInfoQuery = useGetChatRoomInfo(roomId);
  const getChatRoomMessagesQuery = useGetChatRoomMessages(roomId);

  if (!params.roomId) {
    return <Navigate to="/list" />;
  }

  if (!getChatRoomInfoQuery.data || !getChatRoomMessagesQuery.data) {
    return (
      <Layout>
        <div>로딩중...</div>
      </Layout>
    );
  }

  const chatMessageNodes = getChatRoomMessagesQuery.data.map((item, idx) => {
    const ownMessage = item.sender === currentUser;

    const shouldRenderDateDivider =
      idx === 0 ||
      (idx > 0 &&
        getChatRoomMessagesQuery.data[idx - 1]?.sendedDate !== item.sendedDate);

    const shouldRenderMessageSpacer = shouldRenderDateDivider === false;

    const shouldSkipTimeLabel =
      idx < getChatRoomMessagesQuery.data.length - 1 &&
      getChatRoomMessagesQuery.data[idx + 1].sender === item.sender &&
      getChatRoomMessagesQuery.data[idx + 1].sendedTime === item.sendedTime;

    return (
      <Fragment key={item.id}>
        {shouldRenderDateDivider && (
          <ChatRoomDateDivider date={item.timestamp} />
        )}

        {shouldRenderMessageSpacer && (
          <ChatRoomMessageSpacer
            size={
              getChatRoomMessagesQuery.data[idx - 1].sender === item.sender
                ? "small"
                : "medium"
            }
          />
        )}

        <ChatRoomAligner ownMessage={ownMessage}>
          {item.message.type === "text" && (
            <ChatTextMessageBox
              ownMessage={ownMessage}
              message={item.message.text}
              shouldSkipTimeLabel={shouldSkipTimeLabel}
              timestamp={item.timestamp}
            />
          )}

          {item.message.type === "image" && (
            <img src={item.message.filePath} alt="" />
          )}
        </ChatRoomAligner>
      </Fragment>
    );
  });

  return (
    <Layout>
      <ChatRoomLayout>{chatMessageNodes}</ChatRoomLayout>
    </Layout>
  );
};
