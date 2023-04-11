import TimeLabel from "@/components/TimeLabel";
import { getHourAndMinutesLabel } from "@/utils/dateFormatter";
import classNames from "classnames";
import styles from "./ChatTextMessageBox.module.scss";

export interface ChatTextMessageBoxProps {
  ownMessage?: boolean;
  message: string;
  shouldSkipTimeLabel?: boolean;
  timestamp?: string | number | Date;
  className?: string;
}

const ChatTextMessageBox: React.FC<ChatTextMessageBoxProps> = ({
  ownMessage = false,
  message,
  shouldSkipTimeLabel = false,
  timestamp = new Date(),
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["own-message"]]: ownMessage,
      [styles["other-message"]]: !ownMessage,
    },
    className,
  );

  return (
    <div className={mainClassNames}>
      <span className={styles["message-box"]}>{message}</span>

      {!shouldSkipTimeLabel && timestamp && (
        <TimeLabel
          className={styles["time-label"]}
          date={timestamp}
          size="medium"
          formatter={getHourAndMinutesLabel}
        />
      )}
    </div>
  );
};

export default ChatTextMessageBox;
