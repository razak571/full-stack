import { useFetchData } from "./useDataFetch";

function ComponentA() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  if (loading) return <pre> {JSON.stringify(loading)} </pre>;
  if (error) return <pre> {JSON.stringify(error.message)} </pre>;
  console.log(data);
  return <pre> {JSON.stringify(data, null, 2)} </pre>;
}

export default ComponentA;
