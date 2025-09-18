import { useEffect, useState } from "react";
import { useSharedData } from "./useDataShare";

const ComponentB = () => {
  const shared = useSharedData();

  const [message, setMessage] = useState("");

  useEffect(() => {
    shared.subscribe(setMessage);
  }, [shared]);

  return <h1>ComponentB {message}</h1>;
};

export default ComponentB;
