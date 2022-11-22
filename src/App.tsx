import React from "react";
import CharacterCounter from "./components/CharacterCounter";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

export default App;
