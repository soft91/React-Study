import react, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../recoil/atoms";

interface TodoList {
  id: number;
  text: string;
  isComplete: boolean;
}

const TodoItemCreator = () => {
  let id = 0;
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState<TodoList[]>(todoListState);

  const getId = () => {
    return id++;
  };

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({
    target: { value },
  }: {
    target: {
      value: string;
    };
  }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
