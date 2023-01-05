import styled, { css } from "styled-components";
import { IProps } from "./types";
import Typography from "../Typography";

<<<<<<< HEAD
const Container = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #d9d9d9;
	width: 32rem;
	height: 6rem;
	color: #222222;
	background-color: #ffffff;
	border-radius: 3rem;
	cursor: pointer;
	${({ theme }) => themeStyle(theme)}
=======
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
>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a

	&:hover {
		opacity: 0.8;
	}
`;

const ButtonText = styled(Typography)`
	font-size: 1.8rem;
	font-weight: 500;
	line-height: 2.6rem;
`;

<<<<<<< HEAD
const themeStyle = (theme: string) => {
	switch (theme) {
		case "active":
			return css`
				color: #ffffff;
				background: #6bbf00;
			`;
	}
};
=======
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
>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a

const Button = ({
	style,
<<<<<<< HEAD
	className,
	children,
=======
	disabled = false,
>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a
	onClick,
	disabled,
	theme,
}: IProps) => {
	return (
		<Container
			theme={theme}
			style={style}
<<<<<<< HEAD
			className={className}
			onClick={onClick}
			disabled={disabled}
		>
			<ButtonText>{children}</ButtonText>
=======
			disabled={disabled}
			onClick={() => onClick}
		>
			{children}
>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a
		</Container>
	);
};

export default Button;
