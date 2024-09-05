import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async (userId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users?id=${userId}`
  );
  return data;
};

// eslint-disable-next-line react/prop-types
const FetchDetails = ({ userID }) => {
  const results = useQueries({
    queries: [
      // eslint-disable-next-line react/prop-types
      ...userID.map((id) => ({
        queryKey: ["user", id],
        queryFn: () => fetchUser(id),
      })),
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error re baba :: </p>;

  return (
    <div>
      {results.map((result) => (
        <p key={result.id}>
          {JSON.stringify(result.data.map((data) => JSON.stringify({ data })))}
        </p>
      ))}
    </div>
  );
};

const ReactQueryParallelQueries = () => {
  return (
    <div>
      <FetchDetails userID={[1, 2, 3]} />
    </div>
  );
};
export default ReactQueryParallelQueries;
