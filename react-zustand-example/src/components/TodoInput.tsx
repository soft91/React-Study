import React, { useState } from "react";
import { useTodoStore } from "../store/todoStore";
export const TodoInput = () => {
	const [text, setText] = useState("");
	const addTodo = useTodoStore((state) => state.addTodo);

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
		<div className="flex-1 w-full flex justify-center items-center gap-2 max-w-md ">
			<input
				type="search"
				placeholder="할 일을 입력하세요"
				className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button
				className="px-5 py-2 max-w-md border bg-blue-600 rounded-md whitespace-nowrap text-white hover:bg-blue-500 transition duration-200 ease-in-out shadow-md"
				onClick={handleAddTodo}
			>
				추가
			</button>
		</div>
	);
};
