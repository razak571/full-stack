import { useEffect, useState } from "react";
import { useSharedData } from "./UseSharedData";

const ComponentB = () => {
  const shared = useSharedData();

  const [message, setMessage] = useState("");

  useEffect(() => {
    shared.subscribe(setMessage);
  }, [shared]);

  return (
    <>
      <h5>B I am: {message}</h5>
    </>
  );
};

export default ComponentB;
