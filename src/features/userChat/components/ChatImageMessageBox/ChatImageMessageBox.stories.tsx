import MainContainer from "@/layouts/MainContainer";
import { withKnobs } from "@storybook/addon-knobs";
import ChatImageMessageBox from "./ChatImageMessageBox";

const Documentation = {
  title: "Component/UserChat/ChatImageMessageBox",
  component: ChatImageMessageBox,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
        }}
      >
        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          shouldSkipTimeLabel
          ownMessage
        />
        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          ownMessage
        />
        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          ownMessage
          loading
        />

        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          shouldSkipTimeLabel
          ownMessage={false}
        />
        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          ownMessage={false}
        />
        <ChatImageMessageBox
          src={"https://picsum.photos/200/300"}
          timestamp={new Date()}
          ownMessage={false}
          loading
        />
      </div>
    </MainContainer>
  );
};
