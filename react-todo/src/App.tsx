import React, { useState } from "react";
import styled from "styled-components";
import { 
  ToDoList,
  InputContainer 
} from "Components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  background-color: #FFFFFF;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function App() {
  const [toDo, setTodo] = useState('');
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = (): void => {
    if(toDo) {
      setToDoList([...toDoList, toDo]);
      setTodo('');
    }
  }

  const deleteToDo = (index: number): void => {
    let list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
  }

  return (
    <Container>
      <Contents>
        <ToDoList toDoList={toDoList} deleteToDo={deleteToDo}></ToDoList>
        <InputContainer
          toDo={toDo}
          onChange={(text) => setTodo(text)}
          onAdd={addToDo}/>
      </Contents>
    </Container>
  )
}

export default App;