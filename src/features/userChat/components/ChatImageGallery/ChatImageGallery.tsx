import classNames from "classnames";
import styles from "./ChatImageGallery.module.scss";

export interface ChatImageGalleryProps {
  children?: React.ReactNode;
}

const ChatImageGallery = ({ children }: ChatImageGalleryProps) => {
  const mainClassNames = classNames({
    [styles.main]: true,
  });

  return (
    <div className={mainClassNames}>
      <div className={styles["track-scroll-container"]}>
        <ol className={styles.track}>{children}</ol>
      </div>

      <div
        className={classNames(
          styles["track-aside-overlay"],
          styles["overlay-left"],
        )}
      />

      <div
        className={classNames(
          styles["track-aside-overlay"],
          styles["overlay-right"],
        )}
      />
    </div>
  );
};

export interface ChatImageGalleryItemProps {
  src: string;
}

const ChatImageGalleryItem = ({ src }: ChatImageGalleryItemProps) => {
  return (
    <li className={styles.item}>
      <img src={src} alt="" />
    </li>
  );
};

ChatImageGallery.Item = ChatImageGalleryItem;

export default ChatImageGallery;
