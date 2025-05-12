import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
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

// 🔧 Craft.js와 호환되도록 타입 지정
export const Container: UserComponent<ContainerProps> = ({
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
			background={background}
			padding={padding}
		>
			{children}
		</ContainerStyled>
	);
};

// Craft metadata 추가
Container.craft = {
	props: {
		padding: 20,
		background: "#fff",
	},
	rules: {
		canDrag: () => true,
	},
};
