import { useState, useMemo } from "react";
function ComponentA() {
  const expensiveCalculation = (num) => {
    console.log("calculating hevy task", num);
    let result = 0;
    for (let i = 0; i < 1e16; i++) {
      result += num;
      return result;
    }
  };

  const [count, setCount] = useState(0);
  // console.log(expensiveCalculation(count));
  const [inc, setInc] = useState(1);

  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  console.log(memoizedValue);

  return (
    <>
      <h1>
        count:{count} || inc: {inc}{" "}
      </h1>
      <button onClick={() => setCount(count + 1)}>count + </button> <br />
      <button onClick={() => setInc(inc + 1)}>inc + </button>
    </>
  );
}

export default ComponentA;
