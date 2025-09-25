import { useRef } from "react";

function ComponentA() {
  const inputRef = useRef();

  const handle = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputRef} /> {"  "}
      <button onClick={handle}>Focus</button>
    </>
  );
}

export default ComponentA;
