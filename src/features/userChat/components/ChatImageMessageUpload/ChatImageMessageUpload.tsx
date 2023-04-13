import { ReactComponent as UploadIcon } from "@/assets/icons/icon-small-upload.svg";
import Button from "@/components/Button";
import classNames from "classnames";
import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import styles from "./ChatImageMessageUpload.module.scss";

export interface ChatImageMessageUploadProps {
  onFileAccepted?: (file: File) => void;
  className?: string;
}

const ChatImageMessageUpload: React.FC<ChatImageMessageUploadProps> = ({
  onFileAccepted,
  className,
}) => {
  const onDropAccepted = (files: File[], event: DropEvent) => {
    const representativeFile = files[0];

    onFileAccepted && onFileAccepted(representativeFile);
  };

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[], event: DropEvent) => {
      const {
        errors: [firstError],
      } = fileRejections[0];

      switch (firstError.code) {
        case "file-invalid-type": {
          alert(
            "올바른 사진 파일을 선택해 주세요. (확장자는 jpg, png, gif만 가능합니다.)",
          );
          break;
        }
        case "file-too-large": {
          // TODO: 파일 에러 메시지의 '최대 용량'과 'maxSize'를 동적으로 연동해야 합니다.
          alert("10MB 이하의 사진 파일만 전송 가능합니다.");
          break;
        }
        case "too-many-files": {
          alert("사진은 한 번에 한 장만 전송할 수 있습니다.");
          break;
        }
        default: {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
          break;
        }
      }
    },
    [],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    /**
     * React Dropzone >= 13부터 Breaking Change로 accept의 사용 방식과 내부 동작이 변경되었습니다.
     * 따라서, ^12로 Downgrade하였습니다.
     * - 다중 파일을 지정한 경우 사용자가 해당하는 확장자를 선택해야 하는 이슈가 있습니다.
     * - *(wildcard)가 올바르게 지원되지 않습니다.
     *
     * @see https://github.com/react-dropzone/react-dropzone/issues/1220
     */
    accept: "image/jpeg,image/pjpeg,image/png,image/gif",
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    minSize: 0,

    noDrag: true,
    noKeyboard: true,
    noClick: true,

    onDropAccepted,
    onDropRejected,
  });

  const mainClassNames = classNames(
    {
      [styles.main]: true,
    },
    className,
  );

  return (
    <div {...getRootProps()} className={mainClassNames}>
      <input {...getInputProps()} />

      <Button
        type="button"
        onClick={open}
        iconBefore={<UploadIcon />}
        variant="ghost"
        size="small"
      />
    </div>
  );
};

export default ChatImageMessageUpload;
