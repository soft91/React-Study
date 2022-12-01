import React from "react";
import styled from "styled-components";

interface IProps {
  size?: string;
  color?: string;
  children: string;
  fontColor?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Container = styled.button<IProps>`
  display: flex;
  width: 100px;
  height: 40px;
  background-color: ${(props) => selectColor(props.color)};
  border: 0;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.fontColor || "black"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const selectColor = (color?: string) => {
  switch (color) {
    case "success":
      return "#6BBF00";
    case "warning":
      return "#C2CF04";
    case "error":
      return "#F65900";
    case "disabled":
      return "#d2d2d2";
    default:
      return "#dddddd";
  }
};

const Button = ({
  size,
  color,
  children,
  fontColor,
  style,
  disabled,
  onClick,
}: IProps) => {
  return (
    <Container
      size={size}
      color={disabled ? "disabled" : color}
      fontColor={disabled ? "gray" : fontColor}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

export default Button;
