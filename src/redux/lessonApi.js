import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformLesson } from "./groupApi";

export const lessonApi = createApi({
  reducerPath: "lessons",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/lessons`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (response) => transformLesson(response),
    }),
  }),
});

export const { useGetLessonQuery } = lessonApi;
