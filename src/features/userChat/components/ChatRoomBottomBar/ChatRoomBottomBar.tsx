import { ReactComponent as SendIcon } from "@/assets/icons/icon-medium-send.svg";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { isIosDevice } from "@/utils/device";
import { useEffect, useRef } from "react";
import styles from "./ChatRoomBottomBar.module.scss";

export interface ChatRoomBottomBarProps {
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ChatRoomBottomBar: React.FC<ChatRoomBottomBarProps> = ({
  defaultValue,
  value,
  placeholder,
  onChange,
  onSubmit,
}) => {
  const asideRef = useRef<HTMLElement | null>(null);

  // Side Effects: IOS Safari 환경의 키보드 이슈에 임시 대응합니다.
  useEffect(() => {
    const asideElement = asideRef.current;

    if (!asideElement || !isIosDevice) return;

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    asideElement.addEventListener("touchmove", onTouchMove);

    return () => {
      asideElement.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <aside ref={asideRef} className={styles.main}>
      <form onSubmit={onSubmit}>
        <TextField
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          shouldFitContainer
        />

        <Button
          type="submit"
          variant="solid"
          size="medium"
          iconBefore={<SendIcon />}
        />
      </form>
    </aside>
  );
};

export default ChatRoomBottomBar;
