import styled from "styled-components";
import { IProps } from "./types";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 300px;
`;

const Label = styled.label`
	display: flex;
`;

const Input = styled.input``;

const TextField = ({
	type,
	label,
	value,
	setValue,
	name,
	className,
	placeholder,
	register,
}: IProps) => {
	return (
		<Container className={className}>
			{label && <Label>{label}</Label>}
			<Input
				type={type === "" ? "text" : type}
				name={name}
				onChange={setValue}
				value={value}
				placeholder={placeholder}
				{...register}
			/>
		</Container>
	);
};

export default TextField;
