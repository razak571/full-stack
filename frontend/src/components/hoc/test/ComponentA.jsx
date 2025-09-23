import { useState, useRef } from "react";

function ComponentA() {
  // useEffect = to run side effects i.e. calling api,

  const [count, setCount] = useState(10);

  const mutableCount = useRef(0);

  const updateMutable = () => {
    mutableCount.current = mutableCount.current + 1;
    console.log(mutableCount.current);
  };

  return (
    <>
      <h1>
        count: {count} || mutable count: {mutableCount.current}{" "}
      </h1>
      <button onClick={() => setCount(count + 1)}>count+</button>
      <br />
      <button onClick={updateMutable}>mutable+</button>
    </>
  );
}

export default ComponentA;
