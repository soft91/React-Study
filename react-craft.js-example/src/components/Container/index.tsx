import React from "react";
import { useNode } from "@craftjs/core";

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
	height = "auto",
	children,
}: SimpleContainerProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
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
		height: "auto",
	},
	rules: {
		canDrag: () => true,
	},
};
