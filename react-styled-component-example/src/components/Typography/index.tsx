import styled from "styled-components";
import { IProps } from "./types";

const Container = styled.div<IProps>`
	display: flex;
	font-size: ${({ size }) => (size ? `${size}rem` : `10rem`)};
	color: ${({ color }) => (color ? `${color}` : "black")};
`;

const Typography = ({ children, color, size }: IProps) => {
	return (
		<Container color={color} size={size}>
			{children}
		</Container>
	);
};
export default Typography;
