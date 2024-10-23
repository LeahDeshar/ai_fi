import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.15:8082/api/v1",
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
