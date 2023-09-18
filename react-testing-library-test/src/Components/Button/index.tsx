import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  backgroundcolor: string;
  hovercolor: string;
}

const Container = styled.div<ContainerProps>`
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundcolor};

  &:hover {
    background-color: ${(props) => props.hovercolor};
  }

  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.div`
  color: #ffffff;
  font-size: 16px;
`;

interface Props {
  label: string;
  backgroundcolor?: string;
  hovercolor?: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
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
