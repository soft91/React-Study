import React, { useRef } from "react";
import Child from "./components/Child";

function App() {
  const childRef = useRef<HTMLInputElement | any>();

  return (
    <div>
      <button onClick={() => childRef.current?.testEvent()}>
        자식 컴포넌트 함수 호출 버튼
      </button>
      <Child ref={childRef} />
    </div>
  );
}

export default App;
