import { withKnobs } from "@storybook/addon-knobs";
import ChatRoomListItem from "./ChatRoomListItem";

const Documentation = {
  title: "Component/UserChat/ChatRoomListItem",
  component: ChatRoomListItem,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
    >
      <ChatRoomListItem
        roomName="Room Name 1"
        roomImageSrc="https://avatars.githubusercontent.com/u/22580992?v=4"
        lastMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        lastMessageTimestamp="2021-08-01T12:00:00.000Z"
        unreadMessages={10}
        onClick={() => console.log("Clicked")}
      />
      <ChatRoomListItem
        roomName="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        roomImageSrc="https://avatars.githubusercontent.com/u/22580992?v=4"
        lastMessage="Lorem Ipsum"
        lastMessageTimestamp={Date.now()}
        onClick={() => console.log("Clicked")}
      />
    </div>
  );
};
