import { withKnobs } from "@storybook/addon-knobs";
import ChatTextMessageBox from "./ChatTextMessageBox";

const Documentation = {
  title: "Component/UserChat/ChatTextMessageBox",
  component: ChatTextMessageBox,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
    >
      <ChatTextMessageBox
        message="안녕하세요. 반갑습니다."
        timestamp={new Date()}
        shouldSkipTimeLabel
        ownMessage
      />
      <ChatTextMessageBox
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        timestamp={new Date()}
        ownMessage
      />

      <ChatTextMessageBox
        message="안녕하세요. 반갑습니다."
        timestamp={new Date()}
        shouldSkipTimeLabel
        ownMessage={false}
      />
      <ChatTextMessageBox
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        timestamp={new Date()}
        ownMessage={false}
      />
    </div>
  );
};
