import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonSize = "small" | "medium";

export interface ButtonProps {
  size?: ButtonSize;
  label: string;
  ariaLabel?: string;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  label,
  ariaLabel,
  iconAfter,
  iconBefore,
  onClick,
  disabled = false,
  loading = false,
  className,
}) => {
  const mergedDisabled = disabled || loading;

  const composedOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (mergedDisabled) {
      return;
    }

    onClick && onClick(event);
  };

  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles[size]]: size,
      [styles.loading]: loading,
    },
    className,
  );

  const contentNode = (
    <div className={styles.content}>
      {iconBefore && (
        <span className={classNames(styles.icon, "icon-before")}>
          {iconBefore}
        </span>
      )}

      {label && <span className={classNames(styles.label)}>{label}</span>}

      {iconAfter && (
        <span className={classNames(styles.icon, "icon-after")}>
          {iconAfter}
        </span>
      )}
    </div>
  );

  return (
    <button
      onClick={composedOnClick}
      className={mainClassNames}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {contentNode}
    </button>
  );
};

export default Button;
