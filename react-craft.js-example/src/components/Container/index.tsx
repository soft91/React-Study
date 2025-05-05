import React from "react";
import { Paper } from "@mui/material";
import { useNode } from "@craftjs/core";

interface ContainerProps {
	background?: string;
	padding?: number;
	children: React.ReactNode;
}

export const Container = ({
	background,
	padding = 0,
	children,
}: ContainerProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<Paper
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
			style={{ margin: "5px 0", background, padding: `${padding}px` }}
		>
			{children}
		</Paper>
	);
};
