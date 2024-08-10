import { useMemo } from "react";

// eslint-disable-next-line react/prop-types
const UseMemoHook = ({ a, b }) => {
  const result = useMemo(() => {
    return a * b;
  }, [a, b]);

  return (
    <div>
      <h1> {result} </h1>
    </div>
  );
};
export default UseMemoHook;
