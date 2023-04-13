import AspectRatio from "@/components/AspectRatio";
import TimeLabel from "@/components/TimeLabel";
import { getHourAndMinutesLabel } from "@/utils/dateFormatter";
import classNames from "classnames";
import { Oval } from "react-loader-spinner";
import styles from "./ChatImageMessageBox.module.scss";

export interface ChatImageMessageBoxProps {
  ownMessage?: boolean;
  src: string;
  ratio?: number;
  shouldSkipTimeLabel?: boolean;
  timestamp?: string | number | Date;
  loading?: boolean;
  className?: string;
}

const ChatImageMessageBox: React.FC<ChatImageMessageBoxProps> = ({
  ownMessage = false,
  src,
  /**
   * 크기가 정해지지 않은 이미지는 Cumulative Layout Shift 현상을 일으킵니다.
   * 따라서, 이미지의 크기를 미리 알 수 있는 경우에는 AspectRatio 컴포넌트를
   * 사용하여 이미지의 크기를 미리 지정해주는 것이 좋습니다.
   *
   * 이미지에 고정값을 주지 않으면, 채팅방 목록 최하단으로 스크롤을 이동할 때,
   * 이미지의 크기가 정해지지 않은 상태에서 레이아웃이 변경되어
   * Cumulative Layout Shift 현상이 발생합니다.
   *
   * @see https://web.dev/optimize-cls/
   */
  ratio = 1,
  shouldSkipTimeLabel = false,
  timestamp = new Date(),
  loading = false,
  className,
}) => {
  const mainClassNames = classNames(
    {
      [styles.main]: true,
      [styles["own-message"]]: ownMessage,
      [styles["other-message"]]: !ownMessage,
      [styles["loading"]]: loading,
    },
    className,
  );

  const shouldRenderTimeLabel = !loading && !shouldSkipTimeLabel && timestamp;
  const shouldRenderOverlayLoader = loading;

  return (
    <div className={mainClassNames}>
      <div className={styles["image-box"]}>
        <AspectRatio ratio={ratio} shouldFitToContainer>
          <img src={src} alt="사진 메시지입니다." />
        </AspectRatio>

        {shouldRenderOverlayLoader && <OverlayMessageLoader />}
      </div>

      {shouldRenderTimeLabel && (
        <TimeLabel
          className={styles["time-label"]}
          date={timestamp}
          size="medium"
          formatter={getHourAndMinutesLabel}
        />
      )}
    </div>
  );
};

const OverlayMessageLoader = () => {
  return (
    <div className={styles["overlay-loader-container"]}>
      <Oval
        height={40}
        width={40}
        strokeWidth={6}
        strokeWidthSecondary={6}
        color="white"
        secondaryColor="rgba(255,255,255, 0.6)"
        wrapperClass={styles.loader}
      />
    </div>
  );
};

export default ChatImageMessageBox;
