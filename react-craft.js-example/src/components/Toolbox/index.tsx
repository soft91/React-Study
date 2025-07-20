"use client";

import React, { memo, useMemo } from "react";
import { useEditor } from "@craftjs/core";

// 드래그 가능한 컴포넌트 아이템
const DraggableItem = memo(
	({
		label,
		component,
		connectors,
	}: {
		label: string;
		component: React.ReactElement;
		connectors: any;
	}) => (
		<div
			ref={(ref) => {
				if (ref) connectors.create(ref, component);
			}}
			className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center cursor-move select-none"
		>
			{label}
		</div>
	)
);

export const Toolbox = memo(() => {
	const { connectors } = useEditor();

	// 컴포넌트 목록을 메모이제이션
	const componentItems = useMemo(
		() => [
			{
				label: "Button",
				component: React.createElement("button", { text: "Click me" }),
			},
			{
				label: "Text",
				component: React.createElement("div", { text: "Hello World" }),
			},
			{
				label: "Container",
				component: React.createElement("div", { background: "#ffffff" }),
			},
		],
		[]
	);

	return (
		<div className="p-4 flex flex-col items-center gap-3">
			<div className="pb-2">
				<p className="text-gray-800 text-sm font-medium">Drag to add</p>
			</div>

			<div className="flex flex-col gap-2 w-full">
				{componentItems.map((item, index) => (
					<DraggableItem
						key={index}
						label={item.label}
						component={item.component}
						connectors={connectors}
					/>
				))}
			</div>
		</div>
	);
});
