import { apiSlice } from "../apiSlice";
import { USER } from "./constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER}`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USER}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = userApiSlice;
