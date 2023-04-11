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

export const Sizes = () => {
  return (
    <>
      <Button label="Small" size="small" />
      <Button label="Medium" size="medium" />
    </>
  );
};
