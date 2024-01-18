import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // credentials  for set up cookies to browser from backend
    credentials: "include",
  }),
  endpoints: () => ({}),
});
