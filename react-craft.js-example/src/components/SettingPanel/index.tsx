import React, { useState } from "react";

export const SettingsPanel = () => {
	const [value, setValue] = useState(20);

	return (
		<div className="bg-gray-100 mt-2 px-4 py-3 rounded-md shadow-sm">
			<div className="flex flex-col gap-4">
				<div>
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700">Selected</p>
						<span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
							Selected
						</span>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Prop
					</label>
					<input
						type="range"
						min={7}
						max={50}
						step={1}
						value={value}
						onChange={(e) => setValue(Number(e.target.value))}
						className="w-full accent-blue-500"
					/>
					<div className="text-xs text-gray-600 mt-1">Value: {value}</div>
				</div>

				<button className="w-full bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-400 transition">
					Delete
				</button>
			</div>
		</div>
	);
};
