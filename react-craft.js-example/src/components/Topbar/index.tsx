import { useEditor } from "@craftjs/core";
import React, { useState } from "react";

type CraftNode = {
	type: {
		resolvedName: string;
	};
	props: {
		[key: string]: any;
	};
	nodes?: string[];
};

type CraftJson = {
	[key: string]: CraftNode;
};

export const Topbar = () => {
	const [enabled, setEnabled] = useState(true);
	const { query } = useEditor();

	const handleToggle = () => {
		setEnabled((prev) => !prev);
	};

	const handleExportHTML = () => {
		const raw = query.serialize();
		const json: CraftJson = JSON.parse(raw);

		const componentToTag: Record<string, string> = {
			Text: "p",
			Button: "button",
			Container: "div",
			Image: "img",
		};

		const renderNode = (id: string): string => {
			const node = json[id];
			if (!node) return "";

			const tag = componentToTag[node.type?.resolvedName] || "div";
			const props = node.props || {};
			const children = (node.nodes || []).map(renderNode).join("");

			const content = props.text ?? children;

			const attrString = Object.entries(props)
				.filter(([key]) => key !== "text")
				.map(([key, value]) => `${key}="${value}"`)
				.join(" ");

			return `<${tag}${
				attrString ? ` ${attrString}` : ""
			}>${content}</${tag}>`;
		};

		const body = renderNode("ROOT");

		const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Craft.js Export</title>
</head>
<body>
${body}
</body>
</html>`;

		console.log(fullHTML);
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
				onClick={handleExportHTML}
				className="text-sm px-3 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-200 transition"
			>
				Export to Static HTML
			</button>
		</div>
	);
};
