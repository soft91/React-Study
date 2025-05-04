import React from "react";

export const Text = ({
	text,
	fontSize,
}: {
	text: string;
	fontSize: number;
}) => {
	return (
		<div>
			<p style={{ fontSize }}>{text}</p>
		</div>
	);
};
