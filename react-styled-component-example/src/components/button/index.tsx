import React from "react";
import styled from "styled-components";
import { IProps } from "./types";
import Typography from "../Typography";

const Container = styled.div<IProps>`
	display: flex;
	width: ${(props) => selectSize(props.size).width};
	height: ${(props) => selectSize(props.size).height};
	background-color: ${(props) => props.color || "#dddddd"};
	border: 0;
	border-radius: 5px;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.fontColor};
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const selectSize = (size?: string) => {
	switch (size) {
		case "large":
			return {
				height: "80px",
				width: "150px",
			};
		case "small":
			return {
				height: "20px",
				width: "50px",
			};
		default:
			return {
				height: "40px",
				width: "100px",
			};
	}
};

// const selectColor = (color?: string) => {
// 	switch (color) {
// 		case "success":
// 			return "#6BBF00";
// 		case "warning":
// 			return "#C2CF04";
// 		case "error":
// 			return "#F65900";
// 		case "disabled":
// 			return "#d2d2d2";
// 		default:
// 			return "#dddddd";
// 	}
// };

const Button = ({
	size,
	color,
	children,
	fontColor,
	style,
	disabled = false,
	onClick,
}: IProps) => {
	return (
		<Container
			size={size}
			color={disabled ? "disabled" : color}
			fontColor={disabled ? "gray" : fontColor}
			style={style}
			disabled={disabled}
			onClick={() => onClick}
		>
			{children}
		</Container>
	);
};

export default Button;
