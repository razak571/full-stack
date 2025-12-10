import { useCallback, useState } from "react";
import ComponentB from "./ComponentB";

function ComponentA() {
  const [count, setCount] = useState(0);
  const [toggel, setToggel] = useState(false);

  // const expensiveComputaion = () => {
  //   console.log("expensive fun called");
  // };

  const expensiveComputaion = useCallback(() => {
    console.log("expensive fun called");
  }, [count]);

  console.log(count);
  console.log(toggel);

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>count ++</button>{" "}
      <br></br>
      <button onClick={() => setToggel((prev) => !prev)}>toggel</button>
      <ComponentB onClick={expensiveComputaion} />
    </>
  );
}

export default ComponentA;
