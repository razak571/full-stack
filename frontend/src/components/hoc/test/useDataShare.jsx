import { useRef, useState } from "react";

let sharedInstance = null;

export function useSharedData() {
  if (!sharedInstance) {
    const [data, setData] = useState(null);
    const subscribers = useRef([]);

    const subscribe = (callback) => {
      subscribers.current.push(callback);
    };

    const notify = (newData) => {
      setData(newData);
      subscribers.current.forEach((callback) => callback(newData));
    };
    sharedInstance = { data, subscribe, notify };
  }

  return sharedInstance;
}
