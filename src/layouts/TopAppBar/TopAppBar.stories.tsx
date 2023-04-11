import Button from "@/components/Button";
import { withKnobs } from "@storybook/addon-knobs";
import TopAppBar from "./TopAppBar";

const Documentation = {
  title: "Component/Layout/TopAppBar",
  component: TopAppBar,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <TopAppBar
      leadingNavItems={
        <>
          <Button label="LEFT1" size="small" />
          <Button label="LEFT2" size="small" />
        </>
      }
      headline="PAGE TITLE"
      trailingNavItems={
        <>
          <Button label="RIGHT1" size="small" />
        </>
      }
    />
  );
};
