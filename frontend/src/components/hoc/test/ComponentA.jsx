import { useEffect, useCallback, useMemo, useState } from "react";

const expensiveCal = () => {
  console.log("expensive called");
};

function ComponentA() {
  // const increment = () => {
  //   console.log("increment called");
  // };

  const increment = useCallback(() => {
    console.log("increment called");
  }, []);

  const [count, setCount] = useState(0);

  const expResult = useMemo(() => expensiveCal(count), [increment]);

  return (
    <>
      <h1>{count} </h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
    </>
  );
}

export default ComponentA;
