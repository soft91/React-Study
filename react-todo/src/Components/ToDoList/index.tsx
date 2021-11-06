import React, { useContext } from "react";
import styled from "styled-components";

import { ToDoItem } from "Components";
import { ToDoListContext } from "Contexts/ToDoList";

const Container = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #BDBDBD;
  margin-bottom: 20px;
`;

export const ToDoList = () => {
  const { toDoList, deleteToDo } = useContext(ToDoListContext);

  return (
    <Container data-testid="toDoList">
      {toDoList.map((item, index) => (
        <ToDoItem
          key={item}
          label={item}
          onDelete={() => deleteToDo(index)}
        />
      ))}
    </Container>
  )
}