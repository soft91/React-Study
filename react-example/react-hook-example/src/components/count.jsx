import React, { useState } from 'react';

function Example() {
  /* useState(초기값)
     기존 class에서 선언했던 this.state를
     함수형 컴포넌트로 만들면서 state를 사용할 수 있게 함.

     코드의 간결성이 있어서 편리한 것 같다.
  */
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You click {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
}