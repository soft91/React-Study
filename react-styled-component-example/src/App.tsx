import React from "react";
import "./App.css";
import { Button } from "./components";

function App() {
  const testAlert = () => {
    alert("test");
  };

  return (
    <div className="App">
      <Button
        color="success"
        fontColor="white"
        style={{ width: "400px" }}
        onClick={testAlert}
      >
        Small
      </Button>
      <Button color="error" fontColor="blue" disabled={true}>
        DISABLED
      </Button>
      <Button color="warning" fontColor="green" onClick={testAlert}>
        Large
      </Button>
    </div>
  );
}

export default App;
