import { useState, useCallback } from "react";
import ComponentB from "./ComponentB";

function ComponentA() {
  const [toggle, setToogle] = useState(false);
  const [count, setCount] = useState(0);

  // const increment = () => {
  //   console.log("increment called");
  //   setCount(count + 1);
  // };

  console.log(toggle);
  const increment = useCallback(() => {
    console.log("increment called");
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <button onClick={() => setToogle(!toggle)}>Toggle</button>
      <ComponentB increment={increment} />
    </>
  );
}

export default ComponentA;
