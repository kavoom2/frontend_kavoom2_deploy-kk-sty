import TimeLabel from "@/components/TimeLabel";
import { getFullDateLabel } from "@/utils/dateFormatter";
import classNames from "classnames";
import styles from "./ChatRoomDateDivider.module.scss";

export interface ChatRoomDateDividerProps {
  date: Date | string | number;
  className?: string;
}

const ChatRoomDateDivider: React.FC<ChatRoomDateDividerProps> = ({
  date = new Date(),
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <div className={mainClassNames}>
      <span className={styles.line} />

      <TimeLabel
        className={styles["date-text"]}
        date={date}
        size="medium"
        formatter={getFullDateLabel}
      />

      <span className={styles.line} />
    </div>
  );
};

export default ChatRoomDateDivider;
