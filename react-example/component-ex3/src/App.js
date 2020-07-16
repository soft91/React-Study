import React from 'react';
import './App.css';
import TodaysPlan from './components/TodaysPlan';
import PropertyCheck from './components/PropertyCheck';
import ChildProperty from './components/ChildProperty';

function App() {
  return (
    <div className="App">
      <TodaysPlan isCheck />
      <PropertyCheck objValue={ {age : 20} } requiredStringValue="안녕~~" />
      <ChildProperty children={<div><h1>자식 노드입니당~~</h1></div>} />
    </div>
  );
}

export default App;
