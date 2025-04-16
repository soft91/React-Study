import { useTodoStore } from "../store/todoStore";

type Props = {
	id: string;
};

export const TodoItem = ({ id }: Props) => {
	const todo = useTodoStore((state) => state.todos.find((t) => t.id === id));
	const toggleTodo = useTodoStore((state) => state.toggleTodo);
	const removeTodo = useTodoStore((state) => state.removeTodo);

	if (!todo) return null;

	return (
		<li className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
			<div className="flex items-center space-x-3 w-full">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleTodo(todo.id)}
					className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
				/>
				<span
					className={`text-gray-800 ${
						todo.completed ? "line-through text-gray-400" : ""
					}`}
				>
					{todo.text}
				</span>
			</div>
			<button
				onClick={() => removeTodo(todo.id)}
				className="text-red-500 hover:text-red-600 transition"
			>
				&times;
			</button>
		</li>
	);
};
