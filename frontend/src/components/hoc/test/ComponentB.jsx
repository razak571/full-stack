import { useFetchData } from "./useDataFetch";
const ComponentB = () => {
  const { data, loading, error } = useFetchData(
    "https://dummy-json.mock.beeceptor.com/posts"
  );

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error {error.message} </h1>;

  console.log(data);
  return (
    <>
      {data?.map((data) => (
        <h1 key={data.id}> Data:: {data.title} </h1>
      ))}
    </>
  );
};

export default ComponentB;
