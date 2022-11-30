import React, { useRef } from "react";

const CopyPaste = () => {
  const divRef = useRef();

  const handleCopyClipBoard = async () => {
    const text = divRef.current.innerText;

    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <>
      <div ref={divRef}>복사해보세요</div>
      <button onClick={handleCopyClipBoard}>복사하기</button>
    </>
  );
};

export default CopyPaste;
