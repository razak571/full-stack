import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async (userID) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users?id=${userID}`
  );
  return data;
};

// eslint-disable-next-line react/prop-types
const User = ({ useriD }) => {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", useriD],
    queryFn: () => fetchUser(useriD),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error : : {error.message} </p>;

  return user?.map((user) => <p key={user.id}>{user.name}</p>);
};

const ReactQueryDeduplicate = () => {
  return (
    <div>
      <User useriD={1} />
      <User useriD={2} />
      <User useriD={2} />
    </div>
  );
};
export default ReactQueryDeduplicate;
