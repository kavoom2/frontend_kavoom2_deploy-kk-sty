import Button from "@/components/Button";
import PageLoader from "@/components/PageLoader";
import {
  ChatImageGallery,
  ChatImageMessageBox,
  ChatImageMessageUpload,
  ChatRoomAligner,
  ChatRoomBottomBar,
  ChatRoomDateDivider,
  ChatRoomLayout,
  ChatRoomMessageSpacer,
  ChatTextMessageBox,
  useClientSideChat,
  useGetChatRoomGallery,
  useGetChatRoomInfo,
  useGetChatRoomMessages,
  useSendChatImageMessage,
  useSendChatTextMessage,
} from "@/features/userChat";
import CollapsableSubBar from "@/layouts/CollapsableSubBar";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";

import { ReactComponent as BackIcon } from "@/assets/icons/icon-small-back.svg";
import { ReactComponent as PicturesIcon } from "@/assets/icons/icon-small-pictures.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/icon-small-search.svg";
import Text from "@/components/Text";
import useDidUpdate from "@/hooks/useDidUpdate";
import useToggle from "@/hooks/useToggle";
import { demoUserId } from "@/mockers/chatMock";
import { mainElementScrollToBottom } from "@/utils/layoutDOM";
import { AnimatePresence } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

type PageHeaderProps = {
  roomId: string;
  currentUser: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ roomId, currentUser }) => {
  // Hooks: 채팅방 페이지 라우팅
  const naviagte = useNavigate();

  const goToChatRoomListPage = () => {
    naviagte("/list");
  };

  // Hooks: 채팅방 기본 정보 조회
  const getChatRoomInfoQuery = useGetChatRoomInfo(roomId);
  const headline = getChatRoomInfoQuery.data?.roomName;

  // Hooks: 채팅방 사진 메시지 전송
  const [sendImageMessage] = useSendChatImageMessage(roomId, currentUser);

  // Hooks: 이미지 갤러리
  const [isGalleryOpen, toggleGallery] = useToggle(false);
  const getChatRoomGalleryQuery = useGetChatRoomGallery(roomId);

  return (
    <>
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
        // 실제로 사용하지 않는 버튼은 disabled 처리합니다.
        trailingNavItems={
          <>
            <Button
              iconBefore={<PicturesIcon />}
              variant="ghost"
              size="small"
              onClick={toggleGallery}
            />

            <ChatImageMessageUpload onFileAccepted={sendImageMessage} />

            <Button
              iconBefore={<SearchIcon />}
              variant="ghost"
              size="small"
              disabled
            />
          </>
        }
      />

      <AnimatePresence>
        {isGalleryOpen && (
          <CollapsableSubBar key="collapsable-subbar-gallery">
            <ChatImageGallery>
              {getChatRoomGalleryQuery.data &&
                getChatRoomGalleryQuery.data.length === 0 && (
                  <Text tagAs="p" style={{ color: "white" }}>
                    사진이 없습니다.
                  </Text>
                )}

              {getChatRoomGalleryQuery.data &&
                getChatRoomGalleryQuery.data?.map((item) => (
                  <ChatImageGallery.Item key={item.id} src={item.filePath} />
                ))}
            </ChatImageGallery>
          </CollapsableSubBar>
        )}
      </AnimatePresence>
    </>
  );
};

type PageMainProps = {
  roomId: string;
  currentUser: string;
};

const PageMain: React.FC<PageMainProps> = ({ roomId, currentUser }) => {
  const getChatRoomMessagesQuery = useGetChatRoomMessages(roomId);
  const { messages: clientSideMessages, lastMessageRequsetedAt } =
    useClientSideChat(roomId);

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
            <ChatImageMessageBox
              ownMessage={ownMessage}
              src={item.message.filePath}
              ratio={item.message.width / item.message.height}
              shouldSkipTimeLabel={shouldSkipTimeLabel}
              timestamp={item.timestamp}
            />
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

          {item.type === "image" && (
            <ChatImageMessageBox
              ownMessage
              src={item.filePath}
              ratio={item.width / item.height}
              shouldSkipTimeLabel
              loading
            />
          )}
        </ChatRoomAligner>
      </Fragment>
    );
  });

  // Side Effect: 특정 사용자가 채팅방에 입장하면, 채팅방의 최하단으로 이동합니다.
  useEffect(() => {
    if (!(roomId && currentUser)) {
      return;
    }

    mainElementScrollToBottom();
  }, [roomId, currentUser]);

  // Side Effect: 새로운 메시지가 추가되면, 채팅방의 최하단으로 이동합니다.
  useDidUpdate(() => {
    if (!lastMessageRequsetedAt) {
      return;
    }

    mainElementScrollToBottom();
  }, [lastMessageRequsetedAt]);

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
  const roomId = params.roomId as string;
  const currentUser = demoUserId;

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
      <PageHeader roomId={roomId} currentUser={currentUser} />

      <PageMain roomId={roomId} currentUser={currentUser} />

      <PageBottomBar roomId={roomId} currentUser={currentUser} />
    </>
  );
};
