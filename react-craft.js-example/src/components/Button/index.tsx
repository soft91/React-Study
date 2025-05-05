import React from "react";
import { Button as MaterialButton } from "@mui/material";
import { useNode } from "@craftjs/core";

interface ButtonProps {
	size?: "small" | "medium" | "large";
	variant?: "text" | "outlined" | "contained";
	text?: string;
	color?:
		| "inherit"
		| "primary"
		| "secondary"
		| "success"
		| "error"
		| "info"
		| "warning";
	children: React.ReactNode;
}

export const Button = ({ size, variant, color, children }: ButtonProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<MaterialButton
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
			size={size}
			variant={variant}
			color={color}
		>
			{children}
		</MaterialButton>
	);
};
