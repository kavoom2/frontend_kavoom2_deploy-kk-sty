import Avatar from "@/components/Avatar";
import TimeLabel from "@/components/TimeLabel";
import useGetChatList from "@/features/userChat/hooks/useGetChatRoomList";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";
import { demoUserId } from "@/mockers/chatMock";
import { getRelativeDateLabel } from "@/utils/dateFormatter";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopAppBar
        headline="채팅"
        leadingNavItems={<>LEFT</>}
        trailingNavItems={<>RIGHT</>}
      />
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export const Component = () => {
  const currentUser = demoUserId;
  const getChatListQuery = useGetChatList(currentUser);

  const chatRoomItemNodes =
    (getChatListQuery.data &&
      getChatListQuery.data.map((room) => {
        const { name: roomName, profilePicture: roomAvatarPicture } =
          room.users.filter((user) => user.id !== currentUser)[0];

        return (
          <li key={room.id}>
            <DemoChatItem
              roomId={room.id}
              roomName={roomName}
              roomAvatarPicture={roomAvatarPicture}
              lastMessage={room.lastMessage}
              lastMessageTimestamp={room.lastMessageTimestamp}
              unreadMessages={room.unreadMessages}
            />
          </li>
        );
      })) ||
    null;

  return (
    <Layout>
      <ol>{chatRoomItemNodes}</ol>
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
