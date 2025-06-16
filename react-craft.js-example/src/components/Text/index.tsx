import React from "react";
import { useNode } from "@craftjs/core";
import styled from "@emotion/styled";
import { ResizableWrapper } from "../../utils/ResizableWrapper";

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
		<ResizableWrapper>
			<TypographyContainer
				ref={(ref) => {
					if (ref) connect(drag(ref));
				}}
			>
				<span>{text}</span>
			</TypographyContainer>
		</ResizableWrapper>
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
