import { useEffect, useState } from "react";
import { useSharedData } from "../custom-hooks/UseSharedData";
const ComponentB = () => {
  const shared = useSharedData();
  const [message, setMessage] = useState();

  useEffect(() => {
    shared.subscribe(setMessage);
  }, [shared]);

  return (
    <>
      <h1>Data from Component : {message} </h1>
    </>
  );
};
export default ComponentB;
