import { withKnobs } from "@storybook/addon-knobs";
import ChatRoomAligner from "./ChatRoomAligner";

const Documentation = {
  title: "Component/UserChat/ChatRoomAligner",
  component: ChatRoomAligner,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
    >
      <ChatRoomAligner ownMessage={false}>
        <div
          style={{ width: "120px", height: "80px", backgroundColor: "blue" }}
        />
      </ChatRoomAligner>

      <ChatRoomAligner ownMessage={true}>
        <div
          style={{ width: "120px", height: "80px", backgroundColor: "blue" }}
        />
      </ChatRoomAligner>
    </div>
  );
};
