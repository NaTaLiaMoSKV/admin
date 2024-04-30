import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags, LIST } from "utils/createApiUtils";

const Courses = "Courses";
const Themes = "Themes";
const ThemeContents = "ThemeContents";
const ThemeHomeworks = "ThemeHomeworks";

export const courseApi = createApi({
  reducerPath: "courses",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Courses, Themes, ThemeContents, ThemeHomeworks],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses/",
      providesTags: (result) => providesTags(result, Courses),
    }),
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: Courses, id }],
    }),
    addCourse: builder.mutation({
      query(body) {
        return {
          url: `/courses/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: Courses, id: LIST }],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Courses, id }],
    }),
    deleteCourse: builder.mutation({
      query(id) {
        return {
          url: `/courses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: Courses, id }],
    }),
    getCourseThemes: builder.query({
      query: (id) => `/courses/${id}/themes`,
      providesTags: (result) => providesTags(result, Themes),
    }),
    addCourseTheme: builder.mutation({
      query({ courseId, ...body }) {
        return {
          url: `/courses/${courseId}/themes`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, { courseId }) => [
        { type: Themes, id: LIST },
        { type: Courses, id: courseId },
      ],
    }),
    getTheme: builder.query({
      query: (id) => `/themes/${id}`,
      providesTags: (result, error, id) => [{ type: Themes, id }],
    }),
    updateTheme: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/themes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Themes, id }],
    }),
    deleteTheme: builder.mutation({
      query(id) {
        return {
          url: `/themes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ course }, error, id) => [
        { type: Themes, id },
        { type: Courses, id: course },
      ],
    }),
    getThemeContent: builder.query({
      query: (id) => `/themes/${id}/content`,
      providesTags: (result, error, id) => [{ type: ThemeContents, id }],
    }),
    setThemeContent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/themes/${id}/content`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: Themes, id },
        { type: ThemeContents, id },
      ],
    }),
    getThemeHomework: builder.query({
      query: (id) => `/themes/${id}/homework`,
      providesTags: (result, error, id) => [{ type: ThemeHomeworks, id }],
    }),
    setThemeHomework: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/themes/${id}/homework`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: Themes, id },
        { type: ThemeHomeworks, id },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,

  useGetCourseThemesQuery,
  useAddCourseThemeMutation,
  useGetThemeQuery,
  useUpdateThemeMutation,
  useDeleteThemeMutation,
  useGetThemeContentQuery,
  useSetThemeContentMutation,
  useGetThemeHomeworkQuery,
  useSetThemeHomeworkMutation,
} = courseApi;
