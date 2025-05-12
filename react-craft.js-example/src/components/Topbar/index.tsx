import React, { useState } from "react";

export const Topbar = () => {
	const [enabled, setEnabled] = useState(true);

	const handleToggle = () => {
		setEnabled((prev) => !prev);
	};

	const handleSerialize = () => {
		console.log("Serialize JSON to console");
	};

	return (
		<div className="bg-teal-100 mt-3 mb-2 px-3 py-2 flex items-center justify-between rounded">
			<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
				<input
					type="checkbox"
					checked={enabled}
					onChange={handleToggle}
					className="toggle-checkbox"
				/>
				<span>Enable</span>
			</label>

			<button
				onClick={handleSerialize}
				className="text-sm px-3 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-200 transition"
			>
				Serialize JSON to console
			</button>
		</div>
	);
};
