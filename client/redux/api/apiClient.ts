import {
  createApi,
  fetchBaseQuery,
  RootState,
} from "@reduxjs/toolkit/query/react";
import { getProfileData } from "react-native-calendars/src/Profiler";

export const authApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.9:8080/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    timeout: 10000,
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
        return {
          url: "/auth/profileUpdate",
          method: "PATCH",
          body: profileData,
        };
      },
    }),
    createFood: builder.mutation({
      query: (foodData) => {
        return {
          url: "/food/create",
          method: "POST",
          body: foodData,
        };
      },
    }),
    createMeal: builder.mutation({
      query: (mealData) => {
        return {
          url: "/meals/create",
          method: "POST",
          body: mealData,
        };
      },
    }),
    createPlaylist: builder.mutation({
      query: (data) => {
        return {
          url: "/playlist/create",
          method: "POST",
          body: data,
        };
      },
    }),
    upadateUserActivity: builder.mutation({
      query: (activityData) => {
        return {
          url: "/daily/activity",
          method: "patch",
          body: activityData,
        };
      },
    }),
    getAllPlaylist: builder.query({
      query: () => "/playlist/all",
    }),

    deletePlaylist: builder.mutation({
      query: (exerciseId) => {
        return {
          url: `/playlist/${exerciseId}`,
          method: "DELETE",
        };
      },
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
    }),

    getallUsersProfile: builder.query({
      query: () => "/auth/get-all-user",
    }),
    getAllUserPost: builder.query({
      query: () => "/post/all",
    }),
    getMyFriends: builder.query({
      query: () => "/social/requests/accepted",
    }),
    getUserActivity: builder.query({
      query: () => "/daily/activity",
    }),
    getUserActivityWeek: builder.query({
      query: () => "/daily/week",
    }),
    getUserInsight: builder.query({
      query: () => "/data/get-insight",
    }),
    getAllFood: builder.query({
      query: () => "/food/get",
    }),
    getMealByType: builder.query({
      query: (mealType) => `/meals/get/${mealType}`,
    }),
    getMealOfDay: builder.query({
      query: () => `/meals/get`,
    }),
    getDailyConmp: builder.query({
      query: () => `/meals/daily`,
    }),
    getMealByDate: builder.query({
      query: (date) => `/meals/get/date/${date}`,
    }),
    getFoodByBarcode: builder.query({
      query: (barcode) => `/food/barcode/${barcode}`,
    }),
    getYt: builder.query({
      query: () => `/fitness/get-yt`,
    }),
    getExe: builder.query({
      query: ({ target_input, k }) =>
        `fitness/predict-fitness?target_input=${target_input}&k=${k}`,
    }),
    createProfile: builder.mutation({
      query: (profileData) => {
        const formData = new FormData();
        formData.append("name", profileData.name);
        formData.append("gender", profileData.gender);
        formData.append("birthday", profileData.birthday.toISOString());
        formData.append(
          "currentHeight",
          JSON.stringify(profileData.currentHeight)
        ); // Send as a JSON string
        formData.append(
          "currentWeight",
          JSON.stringify(profileData.currentWeight)
        ); // Send as a JSON string
        formData.append("goalWeight", JSON.stringify(profileData.goalWeight));
        formData.append("activityLevel", profileData.activityLevel);
        formData.append(
          "activitiesLiked",
          JSON.stringify(profileData.activitiesLiked)
        );
        formData.append("specialPrograms", profileData.specialPrograms); // Adjusted if it needs to be an array or a string
        formData.append("dailySteps", profileData.dailySteps);
        formData.append("preferredDietType", profileData.preferredDietType);
        formData.append("preferredUnits", profileData.preferredUnits);
        console.log("ProfileCreation", profileData);

        // Example to append profilePic (which is a file, like an image)
        if (profileData.profilePic && profileData.profilePic.url) {
          const uriParts = profileData.profilePic.url.split(".");
          const fileType = uriParts[uriParts.length - 1];

          formData.append("profilePic", {
            uri: profileData.profilePic.url,
            name: `profilePic.${fileType}`, // Give a file name
            type: `image/${fileType}`, // Image MIME type
          });
        }

        console.log("formData", formData);

        return {
          url: "/auth/profile",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useCreateProfileMutation,
  useCreateFoodMutation,
  useCreateMealMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpadateUserActivityMutation,
  useGetProfileQuery,
  useGetallUsersProfileQuery,
  useGetAllUserPostQuery,
  useGetDailyConmpQuery,
  useGetUserActivityWeekQuery,
  useGetMyFriendsQuery,
  useGetYtQuery,
  useGetAllPlaylistQuery,
  useGetMealByDateQuery,
  useGetUserInsightQuery,
  useGetAllFoodQuery,
  useGetMealOfDayQuery,
  useGetFoodByBarcodeQuery,
  useGetMealByTypeQuery,
  useGetUserActivityQuery,
  useGetExeQuery,
} = authApi;
