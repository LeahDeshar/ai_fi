import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for your authentication endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/api/v1",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
