import { withKnobs } from "@storybook/addon-knobs";
import PageLoader from "./PageLoader";

const Documentation = {
  title: "Component/Common/PageLoader",
  component: PageLoader,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  return <PageLoader />;
};
