import { ReactComponent as MenusIcon } from "@/assets/icons/icon-small-menus.svg";
import { ReactComponent as UserProfileIcon } from "@/assets/icons/icon-small-user-profile.svg";
import Button from "@/components/Button";
import PageLoader from "@/components/PageLoader/PageLoader";
import {
  ChatListLayout,
  ChatRoomListItem,
  useGetChatRoomList,
} from "@/features/userChat";
import MainContainer from "@/layouts/MainContainer/MainContainer";
import TopAppBar from "@/layouts/TopAppBar/TopAppBar";
import { demoUserId } from "@/mockers/chatMock";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {};

const PageHeader: React.FC<PageHeaderProps> = () => {
  return (
    <TopAppBar
      headline="채팅"
      // 실제로 사용하지 않는 버튼은 disabled 처리합니다.
      leadingNavItems={
        <Button
          iconBefore={<MenusIcon />}
          variant="ghost"
          size="small"
          disabled
        />
      }
      trailingNavItems={
        <Button
          iconBefore={<UserProfileIcon />}
          variant="ghost"
          size="small"
          disabled
        />
      }
    />
  );
};

type PageMainProps = {
  currentUser: string;
};

const PageMain: React.FC<PageMainProps> = ({ currentUser }) => {
  const getChatListQuery = useGetChatRoomList(currentUser);

  const navigate = useNavigate();

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
    <MainContainer>
      <ChatListLayout>
        <ol>{chatRoomItemNodes}</ol>
      </ChatListLayout>
    </MainContainer>
  );
};

export const Component = () => {
  const currentUser = demoUserId;
  const getChatListQuery = useGetChatRoomList(currentUser);

  if (getChatListQuery.isLoading || getChatListQuery.isError) {
    return <PageLoader />;
  }

  return (
    <>
      <PageHeader />

      <PageMain currentUser={currentUser} />
    </>
  );
};
