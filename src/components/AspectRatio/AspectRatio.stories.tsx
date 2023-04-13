import MainContainer from "@/layouts/MainContainer/MainContainer";
import { withKnobs } from "@storybook/addon-knobs";
import AspectRatio from "./AspectRatio";

const Documentation = {
  title: "Component/Common/AspectRatio",
  component: AspectRatio,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return (
    <MainContainer>
      <AspectRatio width={50} ratio={0.5}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "blue",
            border: "4px solid black",
          }}
        />
      </AspectRatio>
      <AspectRatio width={100} ratio={1}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "blue",
            border: "4px solid black",
          }}
        />
      </AspectRatio>
      <AspectRatio width={150} ratio={1}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "blue",
            border: "4px solid black",
          }}
        />
      </AspectRatio>
      <AspectRatio shouldFitToContainer ratio={1}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "blue",
            border: "4px solid black",
          }}
        />
      </AspectRatio>
    </MainContainer>
  );
};
