import React, { ReactNode } from "react";
import { Text } from "../Text";
import { Button } from "../Button";
import { Element } from "@craftjs/core";
import styled from "@emotion/styled";

const CardContainer = styled.div<{
	background?: string;
	padding?: number;
}>`
	background: ${(props) => props.background || "#fff"};
	padding: ${(props) => props.padding || 20}px;
`;

type CardProps = {
	background?: string;
	padding?: number;
	children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ background, padding }: CardProps) => {
	return (
		<CardContainer background={background} padding={padding}>
			<Element id="text" canvas>
				<Text text="Title" />
				<Text text="Subtitle" />
			</Element>
			<Element className="buttons-only">
				<Button text="Learn more">Learn more</Button>
			</Element>
		</CardContainer>
	);
};

Card.craft = {
	displayName: "Card",
	props: {
		background: "#fff",
		padding: 20,
	},
};
