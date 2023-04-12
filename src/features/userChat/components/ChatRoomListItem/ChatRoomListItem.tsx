import Avatar from "@/components/Avatar";
import Text from "@/components/Text";
import TimeLabel from "@/components/TimeLabel";
import { getRelativeDateLabel } from "@/utils/dateFormatter";
import classNames from "classnames";
import styles from "./ChatRoomListItem.module.scss";

export interface ChatRoomListItemProps {
  roomName: string;
  roomImageSrc: string;
  lastMessage?: string;
  lastMessageTimestamp: Date | string | number;
  unreadMessages?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const ChatRoomListItem: React.FC<ChatRoomListItemProps> = ({
  roomName,
  roomImageSrc,
  lastMessage,
  lastMessageTimestamp,
  unreadMessages = 0,
  onClick,
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["has-action"]]: !!onClick,
    },
    className,
  );

  const shouldRenderUnreadMessages = unreadMessages > 0;

  return (
    <div className={mainClassNames} onClick={onClick}>
      <div className={styles["profile-avatar"]}>
        <Avatar name={roomName} src={roomImageSrc} />
      </div>

      <div className={styles["room-info"]}>
        <Text tagAs="span" maxLines={1} className={styles.roomname}>
          {roomName}
        </Text>

        <Text tagAs="span" maxLines={1} className={styles["last-message"]}>
          {lastMessage}
        </Text>
      </div>

      <div className={styles["room-sub-info"]}>
        <TimeLabel
          date={lastMessageTimestamp}
          size="small"
          formatter={getRelativeDateLabel}
        />

        {shouldRenderUnreadMessages && (
          <span className={styles["unread-count"]}>{unreadMessages}</span>
        )}
      </div>
    </div>
  );
};

export default ChatRoomListItem;
