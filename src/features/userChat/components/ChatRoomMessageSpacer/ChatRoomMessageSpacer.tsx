import classNames from "classnames";
import styles from "./ChatRoomMessageSpacer.module.scss";

export interface ChatRoomMessageSpacerProps {
  size?: "small" | "medium";
}

const ChatRoomMessageSpacer: React.FC<ChatRoomMessageSpacerProps> = ({
  size = "medium",
}) => {
  const mainClassNames = classNames({
    [styles.main]: true,
    [styles["size-small"]]: size === "small",
    [styles["size-medium"]]: size === "medium",
  });

  return <div className={mainClassNames} tabIndex={-1} />;
};

export default ChatRoomMessageSpacer;
