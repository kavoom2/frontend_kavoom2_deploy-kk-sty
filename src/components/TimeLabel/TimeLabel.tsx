import classNames from "classnames";
import styles from "./TimeLabel.module.scss";
import { getDateLabel, getDateTimeAttribute } from "./_utils/date";

export interface TimeLabelProps {
  datetime: Date | string;
  className?: string;
}

const TimeLabel: React.FC<TimeLabelProps> = ({ datetime, className }) => {
  const date = new Date(datetime);

  const dateLabel = getDateLabel(date);
  const datetimeAttribute = getDateTimeAttribute(date);

  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <time className={mainClassNames} dateTime={datetimeAttribute}>
      {dateLabel}
    </time>
  );
};

export default TimeLabel;
