import React, {
  Dispatch,
  SetStateAction,
  CSSProperties,
  useCallback,
  ReactNode,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import styled from "styled-components";

interface IProps {
  style?: CSSProperties;
  children?: ReactNode;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const Container = styled.div<IProps>`
  display: flex;
  width: 100px;
`;

const Label = styled.label`
  width: 100px;
  height: 50px;
  background-color: red;
  cursor: pointer;
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ALLOW_FILE_EXTENSION = "image/jpg, image/png, image/jpeg"; // 이미지만 업로드 가능.
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024; // 10MB

const FileInput = ({ value, setValue }: IProps) => {
  const [files, setFiles] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      const files = (target.files as FileList)[0];

      if (files.size > FILE_SIZE_MAX_LIMIT) {
        alert("업로드 가능한 최대 용량은 10MB 입니다.");
        target.value = "";
        return;
      }
      setFiles(files);
    },
    [setFiles]
  );

  // 이미지 DOM에서 삭제 버튼
  return (
    <Container>
      {inputRef.current?.name !== "" ? (
        <Label>
          <Input
            id="input_file"
            ref={inputRef}
            type="file"
            accept={ALLOW_FILE_EXTENSION}
            onChange={(e) => onChangeHandler(e)}
          />
        </Label>
      ) : (
        // 삽입된 이미지 프리뷰
        <span>{files?.name}</span>
      )}
    </Container>
  );
};

export default FileInput;
