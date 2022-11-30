import React from "react";
import "./App.css";
import { Button } from "./components";

function App() {
  return (
    <div className="App">
      <Button color="success">Small</Button>
      <Button color="error">Medium</Button>
      <Button color="warning">Large</Button>
    </div>
  );
}

export default App;
