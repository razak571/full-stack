import { useState, useEffect } from "react";

export function withDataFetching(WrappedComponent, url) {
  return function DataFetchingComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pass the fetched data as props to the wrapped component
    return <WrappedComponent data={data} {...props} />;
  };
}
