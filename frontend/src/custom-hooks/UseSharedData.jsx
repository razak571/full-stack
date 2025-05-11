let sharedInstance = null;

export const useSharedData = () => {
  if (!sharedInstance) {
    let data = null;
    let subscribers = [];

    const subscribe = (callback) => {
      subscribers.push(callback);
    };

    const notify = (newData) => {
      data = newData;
      subscribers.forEach((callback) => callback(newData));
    };

    sharedInstance = { data, subscribe, notify };
  }

  return sharedInstance;
};
