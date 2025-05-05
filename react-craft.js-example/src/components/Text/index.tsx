import React from "react";
import { Typography } from "@mui/material";
import { useNode } from "@craftjs/core";

interface TextProps {
	text: string;
}

export const Text: React.FC<TextProps> = ({ text }) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<div
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
		>
			<Typography variant="body1">{text}</Typography>
		</div>
	);
};
