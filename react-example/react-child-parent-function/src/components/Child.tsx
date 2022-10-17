import React, { forwardRef, useImperativeHandle, useState } from "react";

const Child = forwardRef((props, ref) => {
  const [insertText, setInsertText] = useState("");

  useImperativeHandle(ref, () => ({
    setText: () => {
      setInsertText("test");
    },
  }));

  return <input type="text" value={insertText} />;
});

export default Child;
