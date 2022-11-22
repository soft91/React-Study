import { atom } from "recoil";

interface TodoList {
  id: number;
  text: string;
  isComplete: boolean;
}

const todoListState = atom<TodoList[]>({
  key: "todoListState",
  default: [],
});

const todoListFilterState = atom<string>({
  key: "todoListFilterState",
  default: "Show All",
});

export { todoListState, todoListFilterState };
