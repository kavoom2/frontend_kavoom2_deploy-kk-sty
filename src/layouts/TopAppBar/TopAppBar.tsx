import styles from "./TopAppBar.module.scss";

type TopAppBarProps = {
  leadingNavItems?: React.ReactNode;
  trailingNavItems?: React.ReactNode;
  headline?: string;
};

const TopAppBar: React.FC<TopAppBarProps> = ({
  leadingNavItems,
  trailingNavItems,
  headline,
}) => {
  return (
    <nav className={styles.main}>
      <div className={styles["leading-menu-items"]}>{leadingNavItems}</div>

      <div className={styles["headline"]}>{headline}</div>

      <div className={styles["trailing-menu-items"]}>{trailingNavItems}</div>
    </nav>
  );
};

export default TopAppBar;
