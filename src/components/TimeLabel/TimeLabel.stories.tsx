import {
  getHourAndMinutesLabel,
  getRelativeDateLabel,
} from "@/utils/dateFormatter";
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

  return <TimeLabel date={dateValue} formatter={getHourAndMinutesLabel} />;
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

        <TimeLabel {...args} date={now} formatter={getRelativeDateLabel} />
        <TimeLabel
          {...args}
          date={tenMinutesAgo}
          formatter={getRelativeDateLabel}
        />
        <TimeLabel
          {...args}
          date={oneHourAgo}
          formatter={getRelativeDateLabel}
        />
        <TimeLabel
          {...args}
          date={oneDayAgo}
          formatter={getRelativeDateLabel}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3>yyyy년 M월 d일 (... ~ 일주일 전)</h3>
        <TimeLabel
          {...args}
          date={oneWeekAgo}
          formatter={getRelativeDateLabel}
        />
        <TimeLabel
          {...args}
          date={oneYearAgo}
          formatter={getRelativeDateLabel}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3>hh:mm</h3>
        <TimeLabel
          {...args}
          date="2023-04-11T13:15:30.000Z"
          formatter={getHourAndMinutesLabel}
        />
      </div>
    </>
  );
};
