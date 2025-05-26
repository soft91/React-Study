"use client";

import { Resizable } from "re-resizable";
import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";

interface ResizableWrapperProps {
	children: React.ReactNode;
}

export function ResizableWrapper2({ children }: ResizableWrapperProps) {
	const {
		actions: { setProp },
		width,
		height,
	} = useNode((node) => ({
		width: node.data.props.width as number,
		height: node.data.props.height as number,
	}));

	const [localSize, setLocalSize] = useState({
		width: width || 200,
		height: height || 100,
	});

	useEffect(() => {
		setLocalSize({ width, height });
	}, [width, height]);

	return (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<Resizable
				size={localSize}
				onResizeStop={(e, direction, ref) => {
					const newWidth = ref.offsetWidth;
					const newHeight = ref.offsetHeight;

					setLocalSize({
						width: newWidth,
						height: newHeight,
					});

					setProp((props: any) => {
						props.width = newWidth;
						props.height = newHeight;
					}, 100);
				}}
				style={{ border: "1px dashed gray" }}
				enable={{
					top: false,
					right: true,
					bottom: true,
					left: false,
					topRight: true,
					bottomRight: true,
					bottomLeft: true,
					topLeft: true,
				}}
				maxWidth="100%"
				maxHeight="100%"
			>
				{children}
			</Resizable>
		</div>
	);
}
