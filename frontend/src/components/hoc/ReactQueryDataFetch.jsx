import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@cristata/react-skeleton-loader";

const ReactQueryDataFetch = (WrappedComponent, url, key) => {
  // console.log(key);
  return function DataFetchingComponent(props) {
    const { data, isPending, isError, error } = useQuery({
      queryKey: [key],
      queryFn: async () => {
        const response = await axios.get(url);
        return response.data;
      },
    });

    if (isPending) return <Skeleton color="grey" count={5} />;
    if (isError) return <h1>Error : : {error.message} </h1>;

    return <WrappedComponent data={data} {...props} />;
  };
};
export default ReactQueryDataFetch;
