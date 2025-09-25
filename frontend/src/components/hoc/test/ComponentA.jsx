import { useEffect, useCallback, useState } from "react";

function ComponentA() {
  const increment = () => {
    console.log("increment called");
  };

  // const increment = useCallback(() => {
  //   console.log("increment called");
  // }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect called");
  }, [increment]);

  return (
    <>
      <h1>{count} </h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
    </>
  );
}

export default ComponentA;
