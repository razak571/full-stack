import { useEffect, useState } from "react";

function ComponentA() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);
  }, []);

  return (
    <>
      <h1>Count: {count} </h1>
    </>
  );
}

export default ComponentA;
