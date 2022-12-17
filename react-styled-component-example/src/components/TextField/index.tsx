import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface IProps {
	id?: string;
	name?: string;
	value: string;
	setValue: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	size?: string;
}

const Container = styled.div<{ size?: string }>`
	display: flex;
	align-items: center;
	width: ${(props) => selectSize(props.size).width};
	height: ${(props) => selectSize(props.size).height};
	margin: 5px;
	border: 2px solid black;
	border-radius: 5px;
`;

const Input = styled.input<{ size?: string }>`
	padding-left: 5px;
	outline: none;
	border: 0px;
	width: 100%;
	border-radius: 5px;
	font-size: ${(props) => selectSize(props.size).fontSize};
`;

const selectSize = (size?: string) => {
	switch (size) {
		case "large":
			return {
				height: "50px",
				width: "200px",
				fontSize: "20px",
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
		<Container size={size}>
			<Input
				type="text"
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={setValue}
			/>
		</Container>
	);
};

export default TextField;
