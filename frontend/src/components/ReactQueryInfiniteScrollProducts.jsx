import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({ pageParam = 0 }) => {
  const limit = 10; // Number of items per page
  console.log(pageParam);
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`
  );
  console.log(data);
  return data;
};

const InfiniteScrollProducts = () => {
  const {
    data,
    error,
    fetchNextPage, // function to fetch next page data
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    // Here we need useInfiniteQuery instead useQuery
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0, // 1st thing we need is initialPageParam and pageParam
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.length * 10; // Calculate how many items are fetched
      return totalFetchedItems < lastPage.total ? totalFetchedItems : undefined;
    },
  });

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {/* {JSON.stringify(data)} */}
        {data?.pages?.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default InfiniteScrollProducts;