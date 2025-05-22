"use client";

import { Rnd } from "react-rnd";
import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";

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
		props: node.data.props,
	}));

	const [localSize, setLocalSize] = useState({ width, height });

	useEffect(() => {
		setLocalSize({ width, height });
	}, [width, height]);

	return (
		<Rnd
			size={localSize}
			onResize={(e, direction, ref) => {
				setLocalSize({
					width: ref.offsetWidth,
					height: ref.offsetHeight,
				});
			}}
			onResizeStop={(e, direction, ref) => {
				const newWidth = ref.offsetWidth;
				const newHeight = ref.offsetHeight;

				setProp((props) => {
					props.width = newWidth;
					props.height = newHeight;
				}, 100);
			}}
			style={{ border: "1px dashed gray" }}
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
