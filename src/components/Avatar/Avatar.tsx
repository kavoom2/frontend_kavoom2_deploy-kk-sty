import classNames from "classnames";
import styles from "./Avatar.module.scss";

export interface AvatarProps {
  name: string;
  src: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, src, className }) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <div className={mainClassNames}>
      <span className={styles["image-container"]}>
        <img src={src} alt={name} />
      </span>
    </div>
  );
};

export default Avatar;
