import { useEffect, useState } from "react";

export const useDataFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        console.log(res);
        if (!res.ok) {
          throw Error(`status: ${res.status} || res.ok !true`);
        }
        let fetchedData = await res.json();
        fetchedData = null;
        if (!fetchedData) {
          throw Error("fetchedData is null");
        }
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
