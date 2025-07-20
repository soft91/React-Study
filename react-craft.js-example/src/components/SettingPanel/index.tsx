import React, { memo, useCallback } from "react";
import { useEditor } from "@craftjs/core";

export const SettingsPanel = memo(() => {
	const { selected, actions } = useEditor((state: any) => ({
		selected: state.selected,
	}));

	const selectedNode = selected
		? useEditor((state: any) => state.nodes[selected])
		: null;

	const handleDelete = useCallback(() => {
		if (selected) {
			actions.delete(selected);
		}
	}, [selected, actions]);

	const handleTextChange = useCallback(
		(value: string) => {
			if (selected && selectedNode?.data.props.text !== undefined) {
				actions.setProp(selected, (props) => {
					props.text = value;
				});
			}
		},
		[selected, selectedNode, actions]
	);

	const handleBackgroundChange = useCallback(
		(value: string) => {
			if (selected && selectedNode?.data.props.background !== undefined) {
				actions.setProp(selected, (props) => {
					props.background = value;
				});
			}
		},
		[selected, selectedNode, actions]
	);

	if (!selected || !selectedNode) {
		return (
			<div className="bg-gray-100 mt-2 px-4 py-3 rounded-md shadow-sm">
				<div className="text-center text-gray-500">
					<p>No element selected</p>
				</div>
			</div>
		);
	}

	const { displayName, props } = selectedNode.data;

	return (
		<div className="bg-gray-100 mt-2 px-4 py-3 rounded-md shadow-sm">
			<div className="flex flex-col gap-4">
				<div>
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-gray-700">Selected</p>
						<span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
							{displayName}
						</span>
					</div>
				</div>

				{/* Text 속성 편집 */}
				{props.text !== undefined && (
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Text
						</label>
						<input
							type="text"
							value={props.text || ""}
							onChange={(e) => handleTextChange(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter text..."
						/>
					</div>
				)}

				{/* Background 속성 편집 */}
				{props.background !== undefined && (
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Background Color
						</label>
						<input
							type="color"
							value={props.background || "#ffffff"}
							onChange={(e) => handleBackgroundChange(e.target.value)}
							className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
						/>
					</div>
				)}

				{/* Width/Height 속성 편집 */}
				{(props.width !== undefined || props.height !== undefined) && (
					<div className="grid grid-cols-2 gap-2">
						{props.width !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Width
								</label>
								<input
									type="number"
									value={props.width || 200}
									onChange={(e) => {
										actions.setProp(selected, (props) => {
											props.width = Number(e.target.value);
										});
									}}
									className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
									min="50"
									max="800"
								/>
							</div>
						)}
						{props.height !== undefined && (
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Height
								</label>
								<input
									type="number"
									value={props.height || 50}
									onChange={(e) => {
										actions.setProp(selected, (props) => {
											props.height = Number(e.target.value);
										});
									}}
									className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
									min="30"
									max="600"
								/>
							</div>
						)}
					</div>
				)}

				<button
					onClick={handleDelete}
					className="w-full bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 transition"
				>
					Delete
				</button>
			</div>
		</div>
	);
});
