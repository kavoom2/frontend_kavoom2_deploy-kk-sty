import classNames from "classnames";
import styles from "./Text.module.scss";

// Text 요소의 색상 및 크기는 지정하지 않습니다.
// - 디자인 시스템 상에 계층에 따른 색상 및 크기가 명확하게 정의되어 있지 않습니다.

type TagAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TextStyles = React.CSSProperties & {
  "--text-max-lines"?: number;
};

export interface TextProps {
  /**
   * 렌더링할 태그를 지정합니다.
   */
  tagAs?: TagAs;
  /**
   * 최대 줄 수를 지정합니다.
   */
  maxLines?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  tagAs = "span",
  maxLines,
  className,
  style,
  children,
}) => {
  const Tag = tagAs;

  const mainClassNames = classNames(
    {
      [styles["ellipsis-single"]]: maxLines === 1,
      [styles["ellipsis-multiple"]]: maxLines && maxLines > 1,
    },
    className,
  );

  const mainStyles: TextStyles = {
    ...style,
    "--text-max-lines": maxLines && maxLines > 1 ? maxLines : undefined,
  };

  return (
    <Tag className={mainClassNames} style={mainStyles}>
      {children}
    </Tag>
  );
};

export default Text;
