import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffect,
} from "react";
import styled from "styled-components";

interface IProps {
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

const DropdownReset = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
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

const DropdownButton = styled.div`
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
  { key: "test10", value: "yoon" },
  { key: "test11", value: "yoon" },
  { key: "test12", value: "yoon" },
  { key: "test13", value: "yoon" },
  { key: "test14", value: "yoon" },
  { key: "test15", value: "yoon" },
];

const SelectBox = ({ placeholder, isSearchable, setValue }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
    },
    [setSelected]
  );

  const selectedItem = useCallback(
    (item: string) => {
      setValue(item);
      setSelected(item);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen, setSelected]
  );

  const toggle = (e) => {
    setIsOpen(e && e.target === inputRef.current);
  };

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  return (
    <Container>
      <DropDownContainer>
        {isSearchable ? (
          <>
            <DropdownSearchInput
              value={selected}
              placeholder={placeholder || "Search..."}
              onClick={toggle}
              onChange={onChangeHandler}
            />
            <DropdownReset onClick={() => setSelected("")}>X</DropdownReset>
          </>
        ) : (
          <Dropdown>{selected}</Dropdown>
        )}
        <DropdownButton onClick={() => setOpen((prev) => !prev)}>
          선택
        </DropdownButton>
      </DropDownContainer>
      <DropdownList show={open}>
        {dummyData
          .filter((item) => {
            return (
              item.value.toLowerCase().indexOf(selected.toLowerCase()) > -1
            );
          })
          .map((item) => (
            <DropdownItem
              key={item.key}
              onClick={() => selectedItem(item.value)}
            >
              {item.value}
            </DropdownItem>
          ))}
      </DropdownList>
    </Container>
  );
};

export default SelectBox;
