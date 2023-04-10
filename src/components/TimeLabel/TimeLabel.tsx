import classNames from "classnames";
import styles from "./TimeLabel.module.scss";
import { getDateLabel, getDateTimeAttribute } from "./_utils/date";

export interface TimeLabelProps {
  /**
   * Date 객체 | 문자열 타입의 날짜 | 숫자 타입의 Timestamp를 받을 수 있습니다.
   */
  date: Date | string | number;
  className?: string;
}

const TimeLabel: React.FC<TimeLabelProps> = ({
  date = new Date(),
  className,
}) => {
  const dateObj = new Date(date);

  const dateLabel = getDateLabel(dateObj);
  const datetimeAttribute = getDateTimeAttribute(dateObj);

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
