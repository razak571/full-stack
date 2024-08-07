import { apiSlice } from "../apiSlice";
import { USER } from "./constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApiSlice;
