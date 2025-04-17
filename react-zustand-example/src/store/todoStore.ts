import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

type TodoStore = {
	todos: Todo[];
	addTodo: (text: string) => void; // Todo Add
	toggleTodo: (id: string) => void; // Todo Toggle
	removeTodo: (id: string) => void; // Todo Remove
	clearTodos: () => void; // Todo Clear
};

export const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			todos: [],
			addTodo: (text: string) =>
				set((state) => ({
					todos: [
						...state.todos,
						{ id: nanoid(), text, completed: false },
					],
				})),
			toggleTodo: (id: string) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id
							? { ...todo, completed: !todo.completed }
							: todo
					),
				})),
			removeTodo: (id: string) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
			clearTodos: () =>
				set((state) => (state.todos.length ? { todos: [] } : state)),
		}),
		{
			name: "todo-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
