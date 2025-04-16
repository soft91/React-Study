import { useTodoStore } from "../store/todoStore";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
	const todos = useTodoStore((state) => state.todos);

	return (
		<ul className="space-y-2 mt-4 w-full max-w-md mx-auto">
			{todos.map((todo) => (
				<TodoItem key={todo.id} id={todo.id} />
			))}
		</ul>
	);
};
