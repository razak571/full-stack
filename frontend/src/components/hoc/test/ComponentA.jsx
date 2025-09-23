import { useCallback, useState } from "react";
import ComponentB from "./ComponentB";

function ComponentA() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const increment = useCallback(() => {
    console.log("call");
    setCount((prevCount) => prevCount + 1);
  }, []);

  // const increment = () => {
  //   console.log("call");
  //   setCount((prevCount) => prevCount + 1);
  // };
  console.log(otherState);

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={() => setOtherState(!otherState)}>
          Toggle Other State
        </button>
      </div>
      <ComponentB increment={increment} />
    </>
  );
}

export default ComponentA;
