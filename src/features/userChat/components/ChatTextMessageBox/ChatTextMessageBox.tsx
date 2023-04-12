import TimeLabel from "@/components/TimeLabel";
import { getHourAndMinutesLabel } from "@/utils/dateFormatter";
import classNames from "classnames";
import { Oval } from "react-loader-spinner";
import styles from "./ChatTextMessageBox.module.scss";

export interface ChatTextMessageBoxProps {
  ownMessage?: boolean;
  message: string;
  shouldSkipTimeLabel?: boolean;
  timestamp?: string | number | Date;
  loading?: boolean;
  className?: string;
}

const ChatTextMessageBox: React.FC<ChatTextMessageBoxProps> = ({
  ownMessage = false,
  message,
  shouldSkipTimeLabel = false,
  timestamp = new Date(),
  loading = false,
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["own-message"]]: ownMessage,
      [styles["other-message"]]: !ownMessage,
      [styles["loading"]]: loading,
    },
    className,
  );

  const shouldRenderTimeLabel = !loading && !shouldSkipTimeLabel && timestamp;
  const shouldRenderSpinner = loading;

  return (
    <div className={mainClassNames}>
      <span className={styles["message-box"]}>{message}</span>

      {shouldRenderTimeLabel && (
        <TimeLabel
          className={styles["time-label"]}
          date={timestamp}
          size="medium"
          formatter={getHourAndMinutesLabel}
        />
      )}

      {shouldRenderSpinner && <MessageLoader />}
    </div>
  );
};

const MessageLoader = () => {
  return (
    <Oval
      height={16}
      width={16}
      strokeWidth={8}
      strokeWidthSecondary={8}
      color="#5b36ac"
      secondaryColor="white"
      wrapperClass={styles.loader}
    />
  );
};

export default ChatTextMessageBox;
