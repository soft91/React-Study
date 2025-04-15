import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoLIst";

export const TodoContainer = () => {
	return (
		<div className="flex flex-col items-center py-4 px-4">
			<TodoInput />
			<TodoList />
		</div>
	);
};
