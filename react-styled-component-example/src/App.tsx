import React, { useState } from "react";
import "./App.css";
import { TextField } from "./components";

function App() {
  const [state, setState] = useState<string>("");

  return (
    <div className="App">
      <TextField
        value={state}
        setValue={setState}
        placeholder="입력해주세요"
        size="large"
      />
      <span>{state}</span>
    </div>
  );
}

export default App;
