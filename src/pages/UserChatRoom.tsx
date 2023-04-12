import Button from "@/components/Button";
import PageLoader from "@/components/PageLoader";
import {
  ChatRoomAligner,
  ChatRoomBottomBar,
  ChatRoomDateDivider,
  ChatRoomLayout,
  ChatRoomMessageSpacer,
  ChatTextMessageBox,
  useClientSideChat,
  useGetChatRoomInfo,
  useGetChatRoomMessages,
  useSendChatTextMessage,
} from "@/features/userChat";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

import { ReactComponent as BackIcon } from "@/assets/icons/icon-small-back.svg";
import { ReactComponent as PicturesIcon } from "@/assets/icons/icon-small-pictures.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/icon-small-search.svg";
import { demoUserId } from "@/mockers/chatMock";
import { mainElementScrollToBottom } from "@/utils/layoutDOM";
import { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const demoVariants = {
  initial: { x: 100, opacity: 0 },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

type PageHeaderProps = {
  roomId: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ roomId }) => {
  const naviagte = useNavigate();

  const getChatRoomInfoQuery = useGetChatRoomInfo(roomId);
  const headline = getChatRoomInfoQuery.data?.roomName;

  const goToChatRoomListPage = () => {
    naviagte("/list");
  };

  return (
    <TopAppBar
      headline={headline}
      leadingNavItems={
        <Button
          iconBefore={<BackIcon />}
          variant="ghost"
          size="small"
          onClick={goToChatRoomListPage}
        />
      }
      trailingNavItems={
        <>
          <Button iconBefore={<PicturesIcon />} variant="ghost" size="small" />
          <Button iconBefore={<SearchIcon />} variant="ghost" size="small" />
        </>
      }
    />
  );
};

type PageMainProps = {
  roomId: string;
  currentUser: string;
};

const PageMain: React.FC<PageMainProps> = ({ roomId, currentUser }) => {
  const getChatRoomMessagesQuery = useGetChatRoomMessages(roomId);
  const { messages: clientSideMessages } = useClientSideChat(roomId);

  const chatMessageNodes = getChatRoomMessagesQuery.data?.map((item, idx) => {
    const ownMessage = item.sender === currentUser;

    // Date Divider는 첫 번째 메시지 또는 이전 메시지와 다른 날짜의 메시지에만 출력됩니다.
    const shouldRenderDateDivider =
      idx === 0 ||
      (idx > 0 &&
        getChatRoomMessagesQuery.data[idx - 1]?.sendedDate !== item.sendedDate);

    // Time Divider 직후의 메시지를 제외하면 모든 메시지에는 메시지 스페이서가 있습니다.
    const shouldRenderMessageSpacer = shouldRenderDateDivider === false;

    // 동일 사용자의 동일 시간대 메시지 그룹은 마지막 메시지의 시간 레이블만 출력합니다.
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

  const clientSideChatMessageNodes = clientSideMessages.map((item, idx) => {
    const isFirstMessage = idx === 0;

    let blockSize: "small" | "medium" = "small";
    if (isFirstMessage) {
      const lastMessage =
        getChatRoomMessagesQuery.data?.[
          getChatRoomMessagesQuery.data?.length - 1
        ];

      if (lastMessage?.sender !== currentUser) {
        blockSize = "medium";
      }
    }

    return (
      <Fragment key={item.callId}>
        {isFirstMessage && <ChatRoomMessageSpacer size={blockSize} />}

        <ChatRoomAligner ownMessage>
          {item.type === "text" && (
            <ChatTextMessageBox
              ownMessage
              message={item.text}
              shouldSkipTimeLabel
              loading
            />
          )}

          {item.type === "image" && <img src={item.filePath} alt="" />}
        </ChatRoomAligner>
      </Fragment>
    );
  });

  useEffect(() => {
    if (!(roomId && currentUser)) {
      return;
    }

    mainElementScrollToBottom();
  }, [roomId, currentUser]);

  return (
    <MainContainer>
      <ChatRoomLayout>
        {chatMessageNodes}

        {clientSideChatMessageNodes}
      </ChatRoomLayout>
    </MainContainer>
  );
};

type PageBottomBarProps = {
  roomId: string;
  currentUser: string;
};

const PageBottomBar: React.FC<PageBottomBarProps> = ({
  roomId,
  currentUser,
}) => {
  const [textMessageValue, updateTextMessageValue] = useState("");
  const [sendTextMessage] = useSendChatTextMessage(
    roomId,
    currentUser as string,
  );

  const submitTextMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textMessageValue.trim().length === 0) {
      return;
    }

    sendTextMessage(textMessageValue);
    updateTextMessageValue("");
  };

  return (
    <ChatRoomBottomBar
      value={textMessageValue}
      onChange={updateTextMessageValue}
      onSubmit={submitTextMessage}
      placeholder="메시지를 입력하세요.."
    />
  );
};

export const Component = () => {
  const params = useParams();
  const currentUser = demoUserId;
  const roomId = params.roomId as string;

  const getChatRoomInfoQuery = useGetChatRoomInfo(roomId);
  const getChatRoomMessagesQuery = useGetChatRoomMessages(roomId);

  if (!params.roomId) {
    return <Navigate to="/list" />;
  }

  if (!getChatRoomInfoQuery.data || !getChatRoomMessagesQuery.data) {
    return <PageLoader />;
  }

  return (
    <>
      <PageHeader roomId={roomId} />

      <PageMain roomId={roomId} currentUser={currentUser} />

      <PageBottomBar roomId={roomId} currentUser={currentUser} />
    </>
  );
};
