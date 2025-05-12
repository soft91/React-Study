import React from "react";

export const Toolbox = () => {
	return (
		<div className="p-4 flex flex-col items-center gap-3">
			<div className="pb-2">
				<p className="text-gray-800 text-sm">Drag to add</p>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
					Button
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
					Text
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
					Container
				</button>
				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
					Card
				</button>
			</div>
		</div>
	);
};
