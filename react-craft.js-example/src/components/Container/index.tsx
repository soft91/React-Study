import React from "react";
import { useNode } from "@craftjs/core";
import styled from "@emotion/styled";

const ContainerStyled = styled.div<{
	background?: string;
	padding?: number;
}>`
	background: ${(props) => props.background || "#fff"};
	padding: ${(props) => props.padding || 0}px;
`;

type ContainerProps = {
	background?: string;
	padding?: number;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({
	background,
	padding = 0,
	children,
}: ContainerProps) => {
	const {
		connectors: { connect, drag },
	} = useNode();

	return (
		<ContainerStyled
			ref={(ref) => {
				if (ref) connect(drag(ref));
			}}
			style={{ margin: "5px 0", background, padding: `${padding}px` }}
		>
			{children}
		</ContainerStyled>
	);
};

Container.craft = {
	props: {
		padding: 20,
		background: "#fff",
	},
	rules: {
		canDrag: () => true,
	},
};
