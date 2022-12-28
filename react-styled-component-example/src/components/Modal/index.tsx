import React, { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";
import { IProps } from "./types";

const Container = styled.div<{
	height?: number;
	width?: number;
	open: boolean;
}>`
	display: ${({ open }) => (open ? "flex" : "none")};
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
	height: ${({ height }) => (height ? `${height}rem` : "30rem")};
	width: ${({ width }) => (width ? `${width}rem` : "30rem")};
	width: 30rem;
`;

const Contents = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	height: 3rem;
	gap: 0px 10px;
	margin: 1.5rem;
`;

const Button = styled.div`
	display: flex;
	width: 100%;
	padding: 1.5rem;
	justify-content: center;
	border: 1px solid black;
	border-radius: 5px;
	align-items: center;
	cursor: pointer;
`;

const Modal = ({ type, open, width, height, setOpen, children }: IProps) => {
	return (
		<Container width={width} height={height} open={open}>
			<Contents>{children}</Contents>
			<ButtonWrapper>
				<Button onClick={() => setOpen((prev) => !prev)}>Cancel</Button>
				{type === "confirm" && <Button>Confirm</Button>}
			</ButtonWrapper>
		</Container>
	);
};

export default Modal;
