import { text, withKnobs } from "@storybook/addon-knobs";
import Avatar from "./Avatar";

const Documentation = {
  title: "Component/Common/Avatar",
  component: Avatar,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  const nameProp = "John Doe";
  const nameValue = text("Name", nameProp);

  const srcProp = "https://avatars.githubusercontent.com/u/22580992?v=4";
  const srcValue = text("Src", srcProp);

  return <Avatar name={nameValue} src={srcValue} />;
};
