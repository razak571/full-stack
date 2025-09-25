import ComponentB from "./ComponentB";
import { useDataFetch } from "./UseDataFetch2";

function ComponentA() {
  const { data, loading, error } = useDataFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)} </pre>;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)} </pre>
      <ComponentB />
    </>
  );
}

export default ComponentA;
