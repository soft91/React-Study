export const TodoInput = () => {
	return (
		<div className="flex-1 w-full">
			<input
				type="text"
				placeholder="할 일을 입력하세요"
				className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
			/>
		</div>
	);
};
