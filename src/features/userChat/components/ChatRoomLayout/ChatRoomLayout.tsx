import classNames from "classnames";
import styles from "./ChatRoomLayout.module.scss";

export interface ChatRoomLayoutProps {
  children?: React.ReactNode;
}

const ChatRoomLayout: React.FC<ChatRoomLayoutProps> = ({ children }) => {
  const mainClassNames = classNames({
    [styles.main]: true,
  });

  return <section className={mainClassNames}>{children}</section>;
};

export default ChatRoomLayout;
