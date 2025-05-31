import React from "react";
import { useNode } from "@craftjs/core";
import styled from "@emotion/styled";

const TypographyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

type TextProps = {
	text: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Text = ({ text }: TextProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<TypographyContainer
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
		>
			<span>{text}</span>
		</TypographyContainer>
	);
};

Text.craft = {
	displayName: "Text",
	props: {
		text: "Hello world!",
	},
	rules: {
		canDrag: () => true,
	},
};
