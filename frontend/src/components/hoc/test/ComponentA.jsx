import { useState, useCallback } from "react";
import ComponentB from "./ComponentB";

function ComponentA() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const increment = useCallback(() => {
    console.log("increment called");
    setCount(count + 1);
  }, [count]);

  // const increment = () => {
  //   console.log("increment called");
  // };

  console.log(toggle);
  return (
    <>
      {/* <h1>toggle: {toggle} </h1> */}
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <br />
      {/* <button onClick={() => setCount(count + 1)}>Count+</button> */}

      <ComponentB increment={increment} />
    </>
  );
}

export default ComponentA;
