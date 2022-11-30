import React, { useState } from "react";

const Parent = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>자식 나와라!</button>
      <div style={{ display: show ? "block" : "none" }}>안녕!</div>
    </>
  );
};

export default Parent;
