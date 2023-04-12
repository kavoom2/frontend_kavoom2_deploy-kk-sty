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
          <Button label="1" size="small" variant="ghost" />
          <Button label="2" size="small" variant="ghost" />
        </>
      }
      headline="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      trailingNavItems={
        <>
          <Button label="3" size="small" variant="ghost" />
        </>
      }
    />
  );
};
