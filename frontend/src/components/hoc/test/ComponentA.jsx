import { useMemo, useState } from "react";

const compute = () => {
  console.log("compute function called");

  let result = 0;
  for (let i = 0; i < 100; i++) {
    // console.log("loop ran");
    result += result + i;
  }
  return result;
};

function ComponentA() {
  const [toggle, setToggle] = useState(false);

  console.log(toggle);

  const computeValue = useMemo(() => compute(), []);

  // const computeValue = compute();
  console.log(computeValue);

  return (
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </>
  );
}

export default ComponentA;
