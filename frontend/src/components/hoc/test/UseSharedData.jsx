import { useRef, useState } from "react";

let sharedInstance = null;
export const useSharedData = () => {
  if (!sharedInstance) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const subscribers = useRef([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(null);

    const notify = (newData) => {
      setData(newData);
      subscribers.current.forEach((callback) => callback(newData));
    };

    const subscribe = (callback) => {
      subscribers.current.push(callback);
    };

    sharedInstance = { data, notify, subscribe };
  }
  return sharedInstance;
};
