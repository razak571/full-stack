import { useRef, useState } from "react";

function ComponentA() {
  const mutableCount = useRef(1);
  const [count, setCount] = useState(0);

  const updateMutableCount = () => {
    console.log("called");
    mutableCount.current += 1;
  };

  console.log(`count: ${count} || mutableCount: ${mutableCount.current}`);

  return (
    <>
      <h1>
        count: {count} || mutableCount: {mutableCount.current}{" "}
      </h1>
      <button onClick={() => setCount(count + 1)}>Count++</button> <br />
      <button onClick={updateMutableCount}>Mutable++</button>
    </>
  );
}

export default ComponentA;
