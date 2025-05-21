"use client";

import { useEditor } from "@craftjs/core";
import { Button } from "../Button";
import { Text } from "../Text";
import { Container } from "../Container";
import { Card } from "../Card";

export const Toolbox = () => {
	const { connectors } = useEditor();

	return (
		<div className="p-4 flex flex-col items-center gap-3">
			<div className="pb-2">
				<p className="text-gray-800 text-sm">Drag to add</p>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<div
					ref={(ref) => {
						if (ref) connectors.create(ref, <Button />);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center cursor-move"
				>
					Button
				</div>

				<div
					ref={(ref) => {
						if (ref) connectors.create(ref, <Text text="Title" />);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center cursor-move"
				>
					Text
				</div>

				<div
					ref={(ref) => {
						if (ref) connectors.create(ref, <Container />);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center cursor-move"
				>
					Container
				</div>

				<div
					ref={(ref) => {
						if (ref) connectors.create(ref, <Card />);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center cursor-move"
				>
					Card
				</div>
			</div>
		</div>
	);
};
