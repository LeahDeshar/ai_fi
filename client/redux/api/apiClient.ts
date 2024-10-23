import {
  createApi,
  fetchBaseQuery,
  RootState,
} from "@reduxjs/toolkit/query/react";
import { getProfileData } from "react-native-calendars/src/Profiler";

export const authApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.15:8082/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    updateProfile: builder.mutation({
      query: (profileData) => {
        const formData = new FormData();
        // console.log("formData", profileData);

        // Object.keys(profileData).forEach((key) => {
        //   formData.append(key, profileData[key]);
        // });

        // console.log(formData);
        return {
          url: "/auth/profileUpdate",
          method: "PATCH",
          body: profileData,
        };
      },
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = authApi;
