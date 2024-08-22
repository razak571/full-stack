import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const ReactQueryCRUD = () => {
  const getAllPosts = async () => {
    console.log("fetching posts");
    setUserPosts([]); // Clear previous posts when starting a new fetch
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response.data);
        setUserPosts(response.data); // Set the new posts after fetching
      }, 2000);
    });
  };

  const [userPosts, setUserPosts] = useState([]);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isStale, // Add this to check if the data is stale
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    enabled: false, // Fetching is triggered manually by clicking the button
    staleTime: 3000, // Data is considered fresh for 3 seconds
  });

  useEffect(() => {
    console.log(userPosts);
  }, [userPosts]);

  return (
    <div className="flex justify-between gap-3">
      <div className="m-5 rounded-lg">
        <button onClick={refetch} className="bg-blue-400 p-4 mr-2 rounded-lg">
          Get Posts
        </button>
        <button className="bg-green-500 p-4 mr-2 rounded-lg">
          Create Posts
        </button>
        <button className="bg-amber-600 p-4 mr-2 rounded-lg">
          Update Post
        </button>
        <button className="bg-red-500 p-4 mr-2 rounded-lg">Delete Post</button>

        {isLoading && <h1 className="text-red-600">Loading...</h1>}
        {isError && <h1 className="text-red-500">Error: {error.message}</h1>}

        {!isLoading && !isError && (
          <>
            {isStale && <h2 className="text-yellow-500">Data is stale</h2>}
            {userPosts?.map((post) => (
              <h1 key={post.id} className="text-red-600">
                Post {post.id}: {post.title}
              </h1>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReactQueryCRUD;
