import classNames from "classnames";
import styles from "./Text.module.scss";

type TagAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type Size = "small" | "medium" | "large";

type TextStyles = React.CSSProperties & {
  "--max-lines"?: number;
};

type TextProps = {
  tagAs: TagAs;
  size: Size;
  children: React.ReactNode;
  className?: string;
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  tagAs = "span",
  size,
  children,
  className,
  maxLines,
}) => {
  const Tag = tagAs;

  const mainClassNames = classNames(
    {
      [styles["main"]]: true,
      [styles[size]]: size,
      [styles["ellipsis-single"]]: maxLines === 1,
      [styles["ellipsis-multi"]]: maxLines && maxLines > 1,
    },
    className,
  );

  const mainStyles: TextStyles = {
    "--max-lines": maxLines && maxLines > 1 ? maxLines : undefined,
  };

  return (
    <Tag className={mainClassNames} style={mainStyles}>
      {children}
    </Tag>
  );
};

export default Text;
