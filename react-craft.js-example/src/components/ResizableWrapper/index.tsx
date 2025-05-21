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
	}));

	// ✅ 로컬 상태로 유지
	const [localSize, setLocalSize] = useState({ width, height });

	// ✅ Craft.js 상태가 바뀌었을 때 반영
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

				// ✅ 리사이즈 끝났을 때 Craft.js에 동기화
				setProp((props: any) => {
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
