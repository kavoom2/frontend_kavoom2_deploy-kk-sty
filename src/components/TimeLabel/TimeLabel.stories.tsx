import { date, withKnobs } from "@storybook/addon-knobs";
import TimeLabel from "./TimeLabel";

const Documentation = {
  title: "Component/Common/TimeLabel",
  component: TimeLabel,
  decorators: [withKnobs],
};

export default Documentation;

export const Default = () => {
  const dateProp = new Date();
  const dateValue = date("Date", dateProp);

  return <TimeLabel date={dateValue} />;
};

export const Examples = (args: any) => {
  const now = new Date();

  let tenMinutesAgo = new Date();
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

  let oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  let oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  let oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3>Format distance to now (일주일 전 ~ 현재)</h3>

        <TimeLabel {...args} date={now} />
        <TimeLabel {...args} date={tenMinutesAgo} />
        <TimeLabel {...args} date={oneHourAgo} />
        <TimeLabel {...args} date={oneDayAgo} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3>yyyy년 M월 d일 (... ~ 일주일 전)</h3>
        <TimeLabel {...args} date={oneWeekAgo} />
        <TimeLabel {...args} date={oneYearAgo} />
      </div>
    </>
  );
};
