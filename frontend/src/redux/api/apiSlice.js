import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendBasUrl = import.meta.env.VITE_BACKEND_BASEURL;
const baseQuery = fetchBaseQuery({
  baseUrl: backendBasUrl,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
