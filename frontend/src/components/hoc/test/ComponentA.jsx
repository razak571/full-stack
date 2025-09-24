import { useCallback, useEffect, useState } from "react";

function ComponentA() {
  const [toggle, setToggle] = useState(false);

  // const increment = () => {
  //   console.log("increment called");
  // };

  const increment = useCallback(() => {
    console.log("increment called");
  }, []);

  useEffect(() => {
    console.log("side effect ran...!");
  }, [increment]);

  console.log(toggle);

  return (
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </>
  );
}

export default ComponentA;
