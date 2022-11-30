import React from "react";
import styled from "styled-components";

interface IProps {
  size?: string;
  color?: string;
  children: string;
}

const Container = styled.div<IProps>`
  display: flex;
  width: 100px;
  height: 40px;
  background-color: ${(props) => selectColor(props.color)};
  border: 0;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const selectColor = (color?: string) => {
  switch (color) {
    case "success":
      return "#6BBF00";
    case "warning":
      return "#C2CF04";
    case "error":
      return "#F65900";
    default:
      return "#dddddd";
  }
};

const Button = ({ size, color, children }: IProps) => {
  return (
    <Container size={size} color={color}>
      {children}
    </Container>
  );
};

export default Button;
