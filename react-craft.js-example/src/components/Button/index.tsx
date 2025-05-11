import styled from "@emotion/styled";

const ButtonStyled = styled.button<{ width?: string; height?: string }>`
	width: ${(props) => props.width + "px" || "auto"};
	height: ${(props) => props.height + "px" || "auto"};
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
	}
	&:active {
		background-color: #004085;
	}
	&:disabled {
		background-color: #007bff;
		cursor: not-allowed;
		opacity: 0.65;
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
	}
	&:focus-visible {
		outline: none;
	}
`;

type ButtonProps = {
	text?: string;
	width?: string;
	height?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ text, width, height }: ButtonProps) => {
	return (
		<ButtonStyled width={width} height={height}>
			{text}
		</ButtonStyled>
	);
};

Button.craft = {
	displayName: "Button",
	props: {
		text: "Click me",
		width: "100",
		height: "50",
	},
	related: {},
};
