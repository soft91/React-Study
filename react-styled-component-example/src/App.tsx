import React, { useState } from "react";
import "./App.css";
import { Modal } from "./components";

function App() {
  const [state, setState] = useState<boolean>(false);

  return (
    <div className="App">
      <Modal open={state} setOpen={setState}>
        <span>test</span>
      </Modal>
      <button onClick={() => setState((prev) => !prev)}>click</button>
    </div>
  );
}

export default App;
