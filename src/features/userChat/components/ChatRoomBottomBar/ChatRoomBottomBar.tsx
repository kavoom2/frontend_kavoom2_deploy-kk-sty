import { ReactComponent as SendIcon } from "@/assets/icons/icon-medium-send.svg";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
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
  return (
    <aside className={styles.main}>
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
