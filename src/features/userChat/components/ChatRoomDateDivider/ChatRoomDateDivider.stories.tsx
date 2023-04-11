import { date, withKnobs } from "@storybook/addon-knobs";
import ChatRoomDateDivider from "./ChatRoomDateDivider";

const Documentation = {
  title: "Component/UserChat/ChatRoomDateDivider",
  component: ChatRoomDateDivider,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  const dateProp = new Date();
  const dateValue = date("Date", dateProp);

  return <ChatRoomDateDivider date={dateValue} />;
};
