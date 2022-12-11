import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { charCountState } from "../recoil/Counter/selector";

const CharacterCounter = () => {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
};

const TextInput = () => {
  const [newText, setNewText] = useRecoilState(charCountState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={newText} onChange={onChange} />
      <br />
      Echo2: {newText}
    </div>
  );
};

const CharacterCount = () => {
  const count = useRecoilValue(charCountState);

  return (
    <>
      <span>Character Count: {count.length}</span>
    </>
  );
};

export default CharacterCounter;
