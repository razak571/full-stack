import { useEffect, useState } from "react";

function ComponentA() {
  let url = "https://jsonplaceholder.typicode.com/todos/1";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) {
          throw Error("Res.ok not true");
        }
        const resData = await res.json();
        setData(resData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    };
    dataFetch();
  }, [url]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error hai:: {error}</h1>;
  return (
    <>
      <h1>{data?.title} </h1>
    </>
  );
}

export default ComponentA;
