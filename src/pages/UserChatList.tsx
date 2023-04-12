import { ReactComponent as MenusIcon } from "@/assets/icons/icon-small-menus.svg";
import { ReactComponent as UserProfileIcon } from "@/assets/icons/icon-small-user-profile.svg";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import PageLoader from "@/components/PageLoader/PageLoader";
import TimeLabel from "@/components/TimeLabel";
import {
  ChatListLayout,
  ChatRoomListItem,
  useGetChatRoomList,
} from "@/features/userChat";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";
import { demoUserId } from "@/mockers/chatMock";
import { getRelativeDateLabel } from "@/utils/dateFormatter";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopAppBar
        headline="채팅"
        leadingNavItems={
          <Button iconBefore={<MenusIcon />} variant="ghost" size="small" />
        }
        trailingNavItems={
          <Button
            iconBefore={<UserProfileIcon />}
            variant="ghost"
            size="small"
          />
        }
      />

      <MainContainer>{children}</MainContainer>
    </>
  );
};

export const Component = () => {
  const currentUser = demoUserId;
  const getChatListQuery = useGetChatRoomList(currentUser);

  const navigate = useNavigate();

  if (getChatListQuery.isLoading || getChatListQuery.isError) {
    return <PageLoader />;
  }

  const chatRoomItemNodes =
    (getChatListQuery.data &&
      getChatListQuery.data.map((room) => {
        const { name: roomName, profilePicture: roomAvatarPicture } =
          room.users.filter((user) => user.id !== currentUser)[0];

        const goChatRoom = () => {
          navigate(`/room/${room.id}`);
        };

        return (
          <li key={room.id}>
            <ChatRoomListItem
              roomName={roomName}
              roomImageSrc={roomAvatarPicture}
              lastMessage={room.lastMessage}
              lastMessageTimestamp={room.lastMessageTimestamp}
              unreadMessages={room.unreadMessages}
              onClick={goChatRoom}
            />
          </li>
        );
      })) ||
    null;

  return (
    <Layout>
      <ChatListLayout>
        <ol>{chatRoomItemNodes}</ol>
      </ChatListLayout>
    </Layout>
  );
};

/**
 * 다음은 Chat Item에 대한 데모 컴포넌트입니다.
 */
type DemoChatItemProps = {
  roomId: string;
  roomName: string;
  roomAvatarPicture: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadMessages: number;
};

const DemoChatItem: React.FC<DemoChatItemProps> = ({
  roomId,
  roomName,
  roomAvatarPicture,
  lastMessage,
  lastMessageTimestamp,
  unreadMessages,
}) => {
  const naviagte = useNavigate();

  const goChatRoom = () => {
    naviagte(`/room/${roomId}`);
  };

  return (
    <div onClick={goChatRoom}>
      <h3>{roomName}</h3>
      <p>{lastMessage}</p>

      <Avatar name={roomName} src={roomAvatarPicture} />

      {lastMessageTimestamp && (
        <TimeLabel
          date={lastMessageTimestamp}
          formatter={getRelativeDateLabel}
        />
      )}

      {unreadMessages > 0 && <span>{unreadMessages}</span>}
    </div>
  );
};
