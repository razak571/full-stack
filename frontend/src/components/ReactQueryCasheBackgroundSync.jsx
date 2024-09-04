import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  console.log("Fetching posts...");
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

const ReactQueryCasheBackgroundSync = () => {
  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // enabled: shouldFetch,
    staleTime: 5000,
    cacheTime: 15000,
    refetchOnWindowFocus: false,
  });

  if (isError)
    return <div className="text-red-500">Error : : {error.message} </div>;

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="bg-blue-800 p-5 rounded-lg m-5 text-white hover:bg-blue-900"
      >
        Refetch Data
      </button>
      <p>Data last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}</p>
      <Link to="/about">About</Link>
      {isPending ? (
        <div className="text-orange-400">Loading...</div>
      ) : (
        posts
          ?.slice(0, 5)
          .map((post) => <p key={post.id}> Post: {post.title} </p>)
      )}
    </div>
  );
};
export default ReactQueryCasheBackgroundSync;
