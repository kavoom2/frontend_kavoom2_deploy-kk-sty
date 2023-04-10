import { number, text, withKnobs } from "@storybook/addon-knobs";
import Text from "./Text";

const Documentation = {
  title: "Component/Common/Text",
  component: Text,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Text tagAs="h1">H1</Text>
      <Text tagAs="h2">H2</Text>
      <Text tagAs="h3">H3</Text>
      <Text tagAs="h4">H4</Text>
      <Text tagAs="h5">H5</Text>
      <Text tagAs="h6">H6</Text>
      <Text tagAs="span">SPAN</Text>
      <Text tagAs="span">P</Text>
    </div>
  );
};

export const Ellipsis = () => {
  const textProp =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const textValue = text("Text", textProp);

  const multilineProp = 2;
  const multilineValue = number("Multiline", multilineProp, {
    min: 1,
    max: 10,
    step: 1,
  });

  return (
    <div style={{ maxWidth: "400px" }}>
      <Text tagAs="p" maxLines={multilineValue}>
        {textValue}
      </Text>
    </div>
  );
};
