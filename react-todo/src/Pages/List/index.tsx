import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ToDoList } from "Components";

const Container = styled.div`
  display: flex;
  background-color: #FFFFFF;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;

const AddButton = styled(Link)`
  font-size: 20px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  background-color: #304FFE;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  &:hover {
    background-color: #1E40FF;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const List = () => {
  return (
    <Container>
      <ToDoList />
      <AddButton to="/add">+</AddButton>
    </Container>
  );
};