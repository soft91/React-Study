"use client";

import { Rnd } from "react-rnd";
import { useNode } from "@craftjs/core";
import React from "react";

interface ResizableWrapperProps {
	children: React.ReactNode;
}

export function ResizableWrapper({ children }: ResizableWrapperProps) {
	const {
		actions: { setProp },
		width,
		height,
	} = useNode((node) => ({
		width: node.data.props.width as number,
		height: node.data.props.height as number,
	}));

	return (
		<Rnd
			enableUserSelectHack={false}
			bounds="parent"
			disableDragging={true}
			onResizeStop={(e, direction, ref) => {
				const newWidth = ref.offsetWidth;
				const newHeight = ref.offsetHeight;

				setProp((props: any) => {
					props.width = newWidth;
					props.height = newHeight;
				}, 100);
			}}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				border: "1px dashed gray",
				outline: "none",
			}}
		>
			{children}
		</Rnd>
	);
}

ResizableWrapper.craft = {
	displayName: "ResizableWrapper",
	props: {
		width: 300,
		height: 200,
	},
	rules: {
		canDrag: () => true,
	},
};
