import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchProducts = async (page) => {
  const limit = 10; // Number of items per page
  const skip = page * limit; // Calculate skip based on the current page

  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  console.log(data);
  return data;
};

const PaginatedProducts = () => {
  const [page, setPage] = useState(0);

  const {
    data: products,
    isPending,
    isError,
    error,
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData, // Keeps previous data while new data is being fetched
  });

  if (isPending) return <div>Loading Products....</div>;
  if (isError) return <div>Error : : {error.message} </div>;

  return (
    <div>
      <h1>Products</h1>
      {products?.products?.map((product) => (
        <li key={product.id}> {product.title} </li>
      ))}
      <button
        className="bg-orange-400 p-2 rounded-lg hover:bg-orange-300 text-white m-2"
        disabled={page === 0}
        onClick={() => {
          setPage((prev) => Math.max(prev - 1, 0));
        }}
      >
        Previous Page{" "}
      </button>
      <span>Page {page} </span>
      <button
        className="bg-gray-900 p-2 rounded-lg hover:bg-gray-800 text-white m-2"
        onClick={() => {
          if (!isPlaceholderData && (page + 1) * 10 < products.total) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPlaceholderData || (page + 1) * 10 >= products.total}
      >
        Next Page
      </button>
      {isFetching && <div>Fetching data...</div>}
    </div>
  );
};
export default PaginatedProducts;
