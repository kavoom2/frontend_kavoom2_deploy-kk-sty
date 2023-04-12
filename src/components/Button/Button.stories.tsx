import { ReactComponent as SendIcon } from "@/assets/icons/icon-medium-send.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/icon-small-back.svg";
import { ReactComponent as MenusIcon } from "@/assets/icons/icon-small-menus.svg";
import { ReactComponent as PicturesIcon } from "@/assets/icons/icon-small-pictures.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/icon-small-search.svg";
import { ReactComponent as UserProfileIcon } from "@/assets/icons/icon-small-user-profile.svg";
import { text, withKnobs } from "@storybook/addon-knobs";
import Button from "./Button";

const Documentation = {
  title: "Component/Common/Button",
  component: Button,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  const labelProp = "Button";
  const labelValue = text("Label", labelProp);

  return <Button label={labelValue} />;
};

export const Variants = () => {
  return (
    <div style={{ backgroundColor: "green" }}>
      <Button label="Solid" variant="solid" />
      <Button label="Solid" variant="solid" disabled />
      <Button label="Solid" variant="solid" loading />

      <Button label="Ghost" variant="ghost" />
      <Button label="Ghost" variant="ghost" disabled />
      <Button label="Ghost" variant="ghost" loading />
    </div>
  );
};

export const Sizes = () => {
  return (
    <>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
    </>
  );
};

export const WithIcons = () => {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button iconBefore={<MenusIcon />} variant="ghost" size="small" />
      <Button iconBefore={<UserProfileIcon />} variant="ghost" size="small" />
      <Button iconBefore={<BackIcon />} variant="ghost" size="small" />
      <Button iconBefore={<PicturesIcon />} variant="ghost" size="small" />
      <Button iconBefore={<SearchIcon />} variant="ghost" size="small" />

      <Button iconBefore={<SendIcon />} variant="solid" size="medium" />
    </div>
  );
};
