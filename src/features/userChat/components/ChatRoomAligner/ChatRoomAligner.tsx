import classNames from "classnames";
import styles from "./ChatRoomAligner.module.scss";

export interface ChatRoomAlignerProps {
  ownMessage?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoomAligner: React.FC<ChatRoomAlignerProps> = ({
  ownMessage = false,
  className,
  children,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["own-message"]]: ownMessage,
    },
    className,
  );

  return <div className={mainClassNames}>{children}</div>;
};

export default ChatRoomAligner;
