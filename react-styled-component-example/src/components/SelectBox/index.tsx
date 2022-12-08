import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffect,
  MouseEvent,
  useRef,
  useMemo,
} from "react";
import styled from "styled-components";

interface IProps {
  value?: string;
  list?: any; // 실제 리스트를 만들 배열
  placeholder?: string;
  isSearchable?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
}

const Container = styled.div`
  display: flex;
  position: relative;
  font-size: 1.5rem;
`;

const DropDownContainer = styled.div`
  display: flex;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  width: 15rem;
`;

const DropdownSearchInput = styled.input`
  display: flex;
  align-items: center;
  border: 0px;
  padding-left: 1rem;
  width: 15rem;
  outline: none;
`;

const DropdownList = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  top: 30px;
  left: 0px;
  flex-direction: column;
  width: 15rem;
  transition: 0.5s;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 100%;
  font-size: 1.6rem;
`;

const DropdownItem = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    border-radius: 5px;
    background-color: skyblue;
    color: blue;
  }
`;

let dummyData = [
  { key: "test1", value: "value1" },
  { key: "test2", value: "value2" },
  { key: "test3", value: "value3" },
  { key: "test4", value: "value4" },
  { key: "test5", value: "value5" },
  { key: "test6", value: "value6" },
  { key: "test7", value: "yoon" },
  { key: "test8", value: "yoon" },
  { key: "test9", value: "yoon" },
];

const SelectBox = ({
  value,
  placeholder,
  isSearchable = false,
  setValue,
}: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
      setValue("");
    },
    [setSelected]
  );

  const selectedItem = useCallback(
    (item: string) => {
      setValue(item);
      setSelected("");
      setOpen((prev) => !prev);
    },
    [setValue, setOpen, setSelected]
  );

  const getDisplayValue = useMemo(() => {
    if (selected) return selected;
    if (value) return value;

    return "";
  }, [selected, value]);

  const toggle = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      setOpen(
        e && e.target === (isSearchable ? inputRef.current : divRef.current)
      );
    },
    [isSearchable]
  );

  const listFilter = useMemo(() => {
    return dummyData.filter(
      (item) => item.value.toLowerCase().indexOf(selected.toLowerCase()) > -1
    );
  }, [selected]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => toggle(e));
    return () => document.removeEventListener("click", (e: any) => toggle(e));
  }, []);

  return (
    <Container>
      <DropDownContainer>
        {isSearchable ? (
          <>
            <DropdownSearchInput
              ref={inputRef}
              value={getDisplayValue}
              placeholder={placeholder || "Search..."}
              onClick={toggle}
              onChange={onChangeHandler}
            />
          </>
        ) : (
          <Dropdown ref={divRef}>{getDisplayValue}</Dropdown>
        )}
        <DropdownButton
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          선택
        </DropdownButton>
      </DropDownContainer>
      <DropdownList show={open}>
        {listFilter.map((item) => (
          <DropdownItem key={item.key} onClick={() => selectedItem(item.value)}>
            {item.value}
          </DropdownItem>
        ))}
      </DropdownList>
    </Container>
  );
};

export default SelectBox;
