import { useQuery, useMutation } from "@tanstack/react-query";
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

  const [token, setToken] = useState("");

  useEffect(() => {
    localStorage.setItem("myToken", "dummyToken");
    setToken(localStorage.getItem("myToken"));
  }, []);

  const [userPosts, setUserPosts] = useState([]);
  // const axiosInstance = axios.create({
  //   headers: {
  //     Authorization: `Bearer  ${mytoken}`,
  //   },
  // });

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

  const mutaion = useMutation({
    mutationFn: async (data) => {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
    },
  });

  const updatePost = async (data) => {
    await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${data.id}`,
      { id: data.id, title: data.title },
      { headers: { token } }
      // { headers: { ABC: token } }
    );
  };
  const mutation = useMutation({
    mutationFn: updatePost,
  });

  const mutaionDelete = useMutation({
    mutationFn: async (data) => {
      console.log("data : : ", data);
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${data.id}`
      );
    },
  });

  return (
    <div className="flex justify-between gap-3">
      <div className="m-5 rounded-lg">
        <button onClick={refetch} className="bg-blue-400 p-4 mr-2 rounded-lg">
          Get Posts
        </button>
        <button
          onClick={() => mutaion.mutate({ id: 208, title: "test title" })}
          className="bg-green-500 p-4 mr-2 rounded-lg"
        >
          Create Posts
        </button>
        <button
          onClick={() => mutation.mutate({ id: 10, title: "update title" })}
          className="bg-amber-600 p-4 mr-2 rounded-lg"
        >
          Update Post
        </button>
        <button
          onClick={() => mutaionDelete.mutate({ id: 2001, anything: "yes" })}
          className="bg-red-500 p-4 mr-2 rounded-lg"
        >
          Delete Post
        </button>

        {isLoading && <h1 className="text-red-600">Loading...</h1>}
        {isError && <h1 className="text-red-500">Error: {error.message}</h1>}

        {!isLoading && !isError && (
          <>
            {isStale && <h2 className="text-yellow-500">Data is stale</h2>}
            {posts?.map((post) => (
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
