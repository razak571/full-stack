import { useState, useEffect } from "react";

const ReactHooks = () => {
  // React will react when state changes dude 😎
  const [count, setCount] = useState(5);

  useEffect(() => {
    // used to run side effects 😉
    console.log(count);
  }, [count]);
  return (
    <div className="text-white">
      <p>count is {count}</p>
      <button onClick={() => setCount(count + 1)}> + </button> <br />
      <button onClick={() => setCount(count - 1)}> - </button>
    </div>
  );
};
export default ReactHooks;
