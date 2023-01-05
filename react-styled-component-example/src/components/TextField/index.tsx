import { IProps } from "./types";
import styled, { css } from "styled-components";

const Container = styled.div<{ size?: string; disabled?: boolean }>`
	display: flex;
	align-items: center;
	margin: 5px;
	border: 2px solid black;
	border-radius: 5px;
	background-color: ${(props) => props.disabled && "#dddddd"};
	${({ size }) =>
		size &&
		css`
			${selectSize(size)}
		`}
`;

const Input = styled.input<{ fontSize?: string }>`
	padding-left: 5px;
	outline: none;
	border: 0px;
	width: 100%;
	border-radius: 5px;
	font-size: ${({ fontSize }) => fontSize};
`;

const selectSize = (size?: string) => {
	switch (size) {
		case "large":
			return {
				height: "50px",
				width: "200px",
				fontSize: "30px",
			};
		case "small":
			return {
				height: "30px",
				width: "100px",
				fontSize: "15px",
			};
		default:
			return {
				height: "40px",
				width: "150px",
			};
	}
};

const TextField = ({
	id,
	name,
	value,
	setValue,
	placeholder,
	size,
	disabled = false,
}: IProps) => {
	return (
		<Container size={size} disabled={disabled}>
			<Input
				type="text"
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				fontSize={selectSize(size).fontSize}
				disabled={disabled}
				onChange={setValue}
			/>
		</Container>
	);
};

export default TextField;
