import styled, { css } from "styled-components";
import { IProps } from "./types";

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

	&:hover {
		opacity: 0.8;
	}
`;

const themeStyle = (theme: string) => {
	switch (theme) {
		case "active":
			return css`
				color: #ffffff;
				background: #6bbf00;
			`;
	}
};

const Button = ({ children, style, onClick, disabled, theme }: IProps) => {
	return (
		<Container
			theme={theme}
			style={style}
			disabled={disabled}
			onClick={() => onClick}
		>
			{children}
		</Container>
	);
};

export default Button;
