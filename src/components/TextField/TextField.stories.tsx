import { withKnobs } from "@storybook/addon-knobs";
import TextField from "./TextField";

const Documentation = {
  title: "Component/Common/TextField",
  component: TextField,
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
      <TextField shouldFitContainer />
      <TextField disabled shouldFitContainer style={{ marginTop: "8px" }} />
      <TextField readOnly shouldFitContainer style={{ marginTop: "8px" }} />
      <TextField
        placeholder="Placeholder"
        shouldFitContainer
        style={{ marginTop: "8px" }}
      />
      <TextField minRows={2} shouldFitContainer style={{ marginTop: "8px" }} />
      <TextField maxRows={3} shouldFitContainer style={{ marginTop: "8px" }} />
      <TextField
        minRows={2}
        maxRows={5}
        shouldFitContainer
        style={{ marginTop: "8px" }}
      />
    </div>
  );
};
