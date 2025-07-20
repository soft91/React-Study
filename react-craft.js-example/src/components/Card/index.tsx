import React, { memo, ReactNode } from "react";
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
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.2s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}
`;

type CardProps = {
	background?: string;
	padding?: number;
	children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ background, padding }: CardProps) => {
	return (
		<CardContainer background={background} padding={padding}>
			<Element id="card-text" canvas>
				<Text text="Title" />
				<Text text="Subtitle" />
			</Element>
			<Element id="card-button" canvas>
				<Button text="Learn more" />
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
	rules: {
		canDrag: () => true,
		canMoveIn: () => true,
		canMoveOut: () => true,
	},
};
