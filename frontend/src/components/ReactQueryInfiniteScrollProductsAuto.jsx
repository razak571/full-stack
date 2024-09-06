import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({ pageParam = 0 }) => {
  const limit = 10; // Number of items per page
  console.log(pageParam);
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`
  );
  return data;
};

const ReactQueryInfiniteScrollProductsAuto = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedItems = allPages.length * 10;
      return totalFetchedItems < lastPage.total ? totalFetchedItems : undefined;
    },
  });

  const loadMoreButtonRef = useRef();

  useEffect(() => {
    if (!loadMoreButtonRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreButtonRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.products.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <button
          ref={loadMoreButtonRef}
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

export default ReactQueryInfiniteScrollProductsAuto;
