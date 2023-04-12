import classNames from "classnames";
import styles from "./ChatListLayout.module.scss";

export interface ChatListLayoutProps {
  children?: React.ReactNode;
}

const ChatListLayout: React.FC<ChatListLayoutProps> = ({ children }) => {
  const mainClassNames = classNames({
    [styles.main]: true,
  });

  return <section className={mainClassNames}>{children}</section>;
};

export default ChatListLayout;
