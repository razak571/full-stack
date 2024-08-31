import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

function ReactCRUD() {
  const [shouldFetch, setShouldFetch] = useState(false);
  //   const [name, setName] = useState("razak");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // enabled: shouldFetch,
    staleTime: 10000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const hadleFetch = async () => {
    setShouldFetch(true);
    await refetch();
  };
  return (
    <>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={hadleFetch}>Fetch Data</button>
      <Link to="/about">About</Link>
    </>
  );
}

export default ReactCRUD;
