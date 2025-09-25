import { useDataFetch } from "./UseDataFetch2";

const ComponentB = () => {
  const { data, loading, error } = useDataFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <h1>Loading Posts</h1>;
  if (error) return <h1>`Error:: ${error}`</h1>;

  return (
    <>
      {data?.map((post) => (
        <h5 key={post.id}> {post.title} </h5>
      ))}
    </>
  );
};

export default ComponentB;
