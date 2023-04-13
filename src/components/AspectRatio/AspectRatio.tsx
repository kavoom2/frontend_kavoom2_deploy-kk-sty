import classNames from "classnames";
import styles from "./AspectRatio.module.scss";

function getRatioStyleVariable(ratio: number) {
  return `${Math.floor((1 / ratio) * 100)}%`;
}

export interface AspectRatioProps {
  ratio?: number;
  shouldFitToContainer?: boolean;
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

type MainStyles = React.CSSProperties & {
  "--container-ratio": string;
  "--container-width"?: string;
};

const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 1,
  shouldFitToContainer = false,
  width,
  children,
  style,
  className,
}) => {
  const innerRatio = getRatioStyleVariable(ratio);

  const hasFixedWidth = !shouldFitToContainer && width && width > 0;

  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["fit-to-container"]]: shouldFitToContainer,
      [styles["has-width"]]: hasFixedWidth,
    },
    className,
  );

  const mainStyles: MainStyles = {
    ...style,
    "--container-ratio": innerRatio,
    "--container-width": hasFixedWidth ? `${width}px` : undefined,
  };

  return (
    <div className={mainClassNames} style={mainStyles}>
      <div className={styles["outer-container"]} style={mainStyles}>
        <div className={styles["inner-container"]}>{children}</div>
      </div>
    </div>
  );
};

export default AspectRatio;
