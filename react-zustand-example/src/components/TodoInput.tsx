import React, { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useShallow } from "zustand/shallow";

export const TodoInput = () => {
	const [text, setText] = useState("");
	const { addTodo } = useTodoStore(
		useShallow((state) => ({
			addTodo: state.addTodo,
		}))
	);

	const handleAddTodo = () => {
		if (text.trim() === "") return;
		addTodo(text);
		setText("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && text.trim() !== "") {
			addTodo(text);
			setText("");
		}
	};

	return (
		<div className="flex-1 w-full flex justify-center items-center gap-2">
			<input
				type="search"
				placeholder="할 일을 입력하세요"
				className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button
				className="px-2 py-2 max-w-md border bg-cyan-500 rounded-md"
				onClick={handleAddTodo}
			>
				ADD
			</button>
		</div>
	);
};
