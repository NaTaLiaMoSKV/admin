import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags } from "utils/createApiUtils";
import { strToDate } from "utils/dateUtils";

const transformReview = (review) => ({
  ...review,
  createdAt: strToDate(review.createdAt),
});

const Users = "Users";
const Reviews = "Reviews";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Users, Reviews],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
    }),
    getAllReviews: builder.query({
      query: () => `../reviews`,
      providesTags: (result) => providesTags(result, Reviews),
      transformResponse: (response) => response.map(transformReview),
    }),
    getDisplayedReviews: builder.query({
      query: () => `../../auth/reviews`,
      providesTags: (result) => providesTags(result, Reviews),
      transformResponse: (response) => response.map(transformReview),
    }),
    getUnauthorizedCourses: builder.query({
      query: () => `../../auth/courses`,
    }),
    displayReview: builder.mutation({
      query: ({ id }) => ({
        url: `../reviews/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Reviews, id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAllReviewsQuery,
  useGetDisplayedReviewsQuery,
  useGetUnauthorizedCoursesQuery,
  useDisplayReviewMutation,
} = userApi;
