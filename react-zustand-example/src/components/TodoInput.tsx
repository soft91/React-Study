"use client";

import React, { useState, useCallback } from "react";
import { useTodoStore } from "../store/todoStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const TodoInput = () => {
	const [text, setText] = useState("");
	const addTodo = useTodoStore((state) => state.addTodo);

	const handleAddTodo = useCallback(() => {
		const trimmedText = text.trim();
		if (!trimmedText) {
			toast.error("할 일을 입력하세요");
			return;
		}

		addTodo(trimmedText);
		setText("");
		toast.success("할 일이 추가되었습니다");
	}, [text, addTodo]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleAddTodo();
			}
		},
		[handleAddTodo]
	);

	return (
		<div className="flex-1 w-full flex justify-center items-center gap-2 max-w-md">
			<Input
				type="search"
				placeholder="할 일을 입력하세요"
				className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				variant="default"
				className="px-5 py-2 max-w-md border bg-blue-600 rounded-md whitespace-nowrap text-white hover:bg-blue-500 transition duration-200 ease-in-out shadow-md"
				onClick={handleAddTodo}
			>
				추가
			</Button>
		</div>
	);
};
