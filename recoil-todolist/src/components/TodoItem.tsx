import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/atoms";

interface TodoList {
  id: number;
  text: string;
  isComplete: boolean;
}

const TodoItem = ({ item }: { item: TodoList }) => {
  const [todoList, setTodoList] = useRecoilState<TodoList[]>(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const replaceItemAtIndex = (
    arr: TodoList[],
    index: number,
    newValue: TodoList
  ) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const removeItemAtIndex = (arr: TodoList[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };

  const editItemText = ({
    target: { value },
  }: {
    target: {
      value: string;
    };
  }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;
