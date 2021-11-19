import React from "react";
import styled from "styled-components";
import {
  ToDoList,
  InputContainer 
} from "Components";
import { ToDoListProvider } from "Contexts";
import { Switch, Route } from "react-router-dom";

import { List } from "Pages";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
        </Switch>
      </Container>
    </ToDoListProvider>
  )
}

export default App;