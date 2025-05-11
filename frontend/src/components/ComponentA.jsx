import { useSharedData } from "../custom-hooks/UseSharedData";
import ComponentB from "./ComponentB";

const ComponentA = () => {
  const shared = useSharedData();

  const handleClick = () => {
    shared.notify("Data from componentA");
  };

  return (
    <>
      <button onClick={() => handleClick()}>Send data to ComponentB</button>
      <ComponentB />
    </>
  );
};

export default ComponentA;
