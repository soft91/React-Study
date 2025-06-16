import React from "react";
import { useNode } from "@craftjs/core";
import { ResizableWrapper } from "../../utils/ResizableWrapper";

type SimpleContainerProps = {
	background?: string;
	padding?: string;
	margin?: string;
	flexDirection?: "row" | "column";
	justifyContent?: string;
	alignItems?: string;
	width?: string;
	height?: string;
	children?: React.ReactNode;
};

export const Container = ({
	background = "#ffffff",
	padding = "16px",
	margin = "0",
	flexDirection = "column",
	justifyContent = "flex-start",
	alignItems = "flex-start",
	width = "100%",
	height = "50px",
	children,
}: SimpleContainerProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<ResizableWrapper>
			<div
				ref={(ref) => {
					if (ref) {
						connect(drag(ref));
					}
				}}
				style={{
					background,
					padding,
					margin,
					display: "flex",
					flexDirection,
					justifyContent,
					alignItems,
					width,
					height,
					boxSizing: "border-box",
					border: "1px dashed #ccc",
				}}
			>
				{children}
			</div>
		</ResizableWrapper>
	);
};

Container.craft = {
	displayName: "Simple Container",
	props: {
		background: "#ffffff",
		padding: "16px",
		margin: "0",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		width: "100%",
		height: "50px",
	},
	isCanvas: true,
};
