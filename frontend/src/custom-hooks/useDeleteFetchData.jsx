import { useEffect, useState } from "react";

export const useDataFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("res.ok true nahi hai");
        const myData = await res.json();
        setData(myData);
        setLoading(false);
      } catch (error) {
        console.error("error dere ::", error);
        setError(error.message);
        setLoading(false);
      }
    };
    dataFetch();
  }, [url]);

  return { data, error, loading };
};
