import React from 'react';
import Styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import { PageHeader } from 'Components';
import { List, Add, Detail, NotFound } from 'Pages';

const Container = Styled.div`
  min-height: 100vh;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <PageHeader />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
