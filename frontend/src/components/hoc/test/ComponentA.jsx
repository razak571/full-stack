import { useEffect, useState, useMemo } from "react";

const expensiveCalculation = (data) => {
  console.log(` ${data} expensive called`);
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += i + data;
  }
  return result;
};

function ComponentA() {
  const [count, setCount] = useState(0);
  const [toggle, SetToggle] = useState(false);

  // useEffect(() => {
  //   const expensiveRes = expensiveCalculation(count);
  //   console.log(expensiveRes);
  // }, [count]);

  const expensiveRes = useMemo(() => expensiveCalculation(count), [count]);

  console.log(expensiveRes);
  console.log(toggle);

  return (
    <>
      <h1>{expensiveRes} </h1>
      <button onClick={() => SetToggle(!toggle)}>Toggle</button>
      <button onClick={() => setCount(count + 1)}>Count++</button>
    </>
  );
}

export default ComponentA;
