import React, { useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { IProps } from "./types";

const Container = styled.div`
	display: flex;
	width: 30rem;
	flex-wrap: wrap;
`;

const Wrapper = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const Input = styled.input``;
const Text = styled.span``;

const RadioButton = ({ setValue, className }: IProps) => {
	const dummyData = [
		{ key: "1", value: "hello" },
		{ key: "2", value: "hi" },
		{ key: "3", value: "bonjour" },
		{ key: "4", value: "nihao" },
	];

	const selectedItem = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		},
		[setValue]
	);

	return (
		<Container className={className}>
			{dummyData.map((item) => (
				<Wrapper>
					<Input
						type="radio"
						name="radio"
						value={item.value}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							selectedItem(e)
						}
					/>
					<Text>{item.value}</Text>
				</Wrapper>
			))}
		</Container>
	);
};
export default RadioButton;
