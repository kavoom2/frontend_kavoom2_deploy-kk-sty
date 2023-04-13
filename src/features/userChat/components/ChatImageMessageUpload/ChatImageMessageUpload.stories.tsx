import { withKnobs } from "@storybook/addon-knobs";
import ChatImageMessageUpload from "./ChatImageMessageUpload";

const Documentation = {
  title: "Component/UserChat/ChatImageMessageUpload",
  component: ChatImageMessageUpload,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        background: "purple",
      }}
    >
      <ChatImageMessageUpload
        onFileAccepted={(file) => {
          alert("File accepted: " + file.name);
        }}
      />
    </div>
  );
};
