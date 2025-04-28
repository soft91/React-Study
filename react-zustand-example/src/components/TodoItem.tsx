import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { toast } from "sonner";
import { useAlertStore } from "@/store/alertStore";

type Props = {
	id: string;
};

export const TodoItem = ({ id }: Props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState("");

	const openAlert = useAlertStore((state) => state.openAlert);

	const todo = useTodoStore((state) => state.todos.find((t) => t.id === id));
	const toggleTodo = useTodoStore((state) => state.toggleTodo);
	const removeTodo = useTodoStore((state) => state.removeTodo);
	const editTodo = useTodoStore((state) => state.editTodo);

	if (!todo) return null;

	const handleSave = () => {
		editTodo(todo.id, editText);
		setIsEditing(false);
		toast.success("할 일이 수정되었습니다");
	};

	const handleEditClick = () => {
		setIsEditing(true);
		setEditText(todo.text);
	};

	const handleRemoveClick = () => {
		openAlert({
			title: "정말 삭제하시겠습니까?",
			description: "삭제하면 복구할 수 없습니다.",
			confirmText: "삭제",
			cancelText: "취소",
			onConfirm: () => {
				removeTodo(todo.id);
				toast.success("할 일이 삭제되었습니다");
			},
		});
	};

	return (
		<>
			<li className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
				<div className="flex items-center space-x-3 w-full">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => toggleTodo(todo.id)}
						className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
					/>
					{isEditing ? (
						<input
							type="text"
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
							className="flex-1 border border-gray-300 rounded px-2 py-1 max-w-xs"
						/>
					) : (
						<span
							className={`text-gray-800 ${
								todo.completed ? "line-through text-gray-400" : ""
							} flex-1`}
						>
							{todo.text}
						</span>
					)}
				</div>
				<div className="flex items-center space-x-2">
					{isEditing ? (
						<button
							onClick={handleSave}
							className="text-green-500 hover:text-green-600 transition whitespace-nowrap"
						>
							저장
						</button>
					) : (
						<button
							onClick={handleEditClick}
							className="text-blue-500 hover:text-blue-600 transition whitespace-nowrap"
						>
							수정
						</button>
					)}
					<button
						onClick={handleRemoveClick}
						className="text-red-500 hover:text-red-600 transition"
					>
						&times;
					</button>
				</div>
			</li>
		</>
	);
};
