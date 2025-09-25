import ComponentB from "./ComponentB";
import { useSharedData } from "./UseSharedData";
function ComponentA() {
  const shared = useSharedData();

  const handleClick = () => {
    console.log(shared.notify("Message from Component A"));
  };

  return (
    <>
      <button onClick={handleClick}>Pass Data To Component B</button>
      <ComponentB />
    </>
  );
}

export default ComponentA;
