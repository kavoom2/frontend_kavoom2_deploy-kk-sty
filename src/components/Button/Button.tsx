import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonVariant = "solid" | "ghost";

type ButtonSize = "small" | "medium";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  ariaLabel?: string;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  shouldFitContainer?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  size = "medium",
  label,
  ariaLabel,
  iconAfter,
  iconBefore,
  onClick,
  disabled = false,
  loading = false,
  shouldFitContainer = false,
  className,
  type = "button",
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
      [styles[`variant-${variant}`]]: variant,
      [styles[`size-${size}`]]: size,
      [styles.loading]: loading,
      [styles["fit-container"]]: shouldFitContainer,
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
      disabled={disabled}
      tabIndex={mergedDisabled ? -1 : 0}
      type={type}
    >
      {contentNode}
    </button>
  );
};

export default Button;
