import classNames from "classnames";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TextField.module.scss";

export interface TextFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: (nextValue: string) => void;
  placeholder?: string;

  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;

  maxRows?: number;
  minRows?: number;
  shouldFitContainer?: boolean;
  width?: number;
  style?: React.CSSProperties;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,

  disabled,
  readOnly,

  maxRows,
  minRows,
  shouldFitContainer = false,
  width = 300,

  style,
  className,
}) => {
  const [uncontrolledValue, updateUncontrolledValue] = useState(
    defaultValue || "",
  );

  const isControlled = value !== undefined;

  const composedOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) {
      event.preventDefault();
    }

    if (event.isDefaultPrevented()) return;

    const nextValue = event.target.value;

    if (!isControlled) updateUncontrolledValue(nextValue);
    onChange && onChange(nextValue);
  };

  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["fit-container"]]: shouldFitContainer,
      [styles["fixed-width"]]: !shouldFitContainer && width > 0,
    },
    className,
  );

  const mainStyle = {
    ...style,
    "--container-width": width + "px",
  };

  const innerMinRows = minRows ?? 1;
  const innerMaxRows = maxRows ?? Math.max(innerMinRows, 1);

  return (
    <div className={mainClassNames} style={mainStyle}>
      <TextareaAutosize
        value={isControlled ? value : uncontrolledValue}
        onChange={composedOnChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        minRows={innerMinRows}
        maxRows={innerMaxRows}
      />

      <div className={styles.outline} />
    </div>
  );
};

export default TextField;
