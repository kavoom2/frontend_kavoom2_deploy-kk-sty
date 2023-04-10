import TimeLabel from "./TimeLabel";

const Documentation = {
  title: "TimeLabel",
  component: TimeLabel,
};

export default Documentation;

export const Default = () => <TimeLabel datetime={new Date()} />;

export const SecondaryDemo = () => <TimeLabel datetime={new Date()} />;
