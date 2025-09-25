import { useCallback, useState } from "react";
import ComponentB from "./ComponentB";

function ComponentA() {
  // const increment = () => {
  //   console.log("increment called");
  // };

  const increment = useCallback(() => {
    console.log("increment called");
  }, []);

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count} </h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <ComponentB increment={increment} />
    </>
  );
}

export default ComponentA;
