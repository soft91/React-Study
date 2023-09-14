import React from 'react';
import Styled from 'styled-components';

interface ContainerProps {
  readonly backgroundcolor: string;
  readonly hovercolor: string;
}

const Container = Styled.div<ContainerProps>`
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundcolor};
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2);
  }
`;
const Label = Styled.div`
  color: #FFFFFF;
  font-size: 16px;
`;

interface Props {
  readonly label: string;
  readonly backgroundcolor?: string;
  readonly hovercolor?: string;
  readonly onClick?: () => void;
}

export const Button = ({
  label,
  backgroundcolor = '#304FFE',
  hovercolor = '#1E40FF',
  onClick,
}: Props) => {
  return (
    <Container backgroundcolor={backgroundcolor} hovercolor={hovercolor} onClick={onClick}>
      <Label>{label}</Label>
    </Container>
  );
};
