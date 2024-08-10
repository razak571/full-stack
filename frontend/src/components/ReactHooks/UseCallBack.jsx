import { useCallback, useState } from "react";

const UseCallBack = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("button clicked", count);
  }, [count]);

  return (
    <div>
      <button onClick={handleClick}>Click me</button> <br />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};
export default UseCallBack;
