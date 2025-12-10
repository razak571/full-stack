import { useMemo, useState } from "react";

function ComponentA() {
  const [count, setCount] = useState(0);
  const [toggel, setToggel] = useState(false);
  const expensiveCalculation = (num) => {
    console.log("heavy computaional ran");
    let result = 0;
    for (let i = 0; i < 1e7; i++) {
      result = result + i + num;
    }
    return result;
  };

  const expensiveResult = useMemo(() => expensiveCalculation(count), [count]);

  // const expensiveResult = expensiveCalculation(count);

  console.log(toggel);
  console.log(count);
  return (
    <>
      <h1>memoizedValue: {expensiveResult}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count ++
      </button>{" "}
      <br></br>
      <button onClick={() => setToggel((prev) => !prev)}>INC ++</button>
    </>
  );
}

export default ComponentA;
