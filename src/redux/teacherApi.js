import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags, LIST } from "utils/createApiUtils";

const Teachers = "Teachers";

export const teacherApi = createApi({
  reducerPath: "teachers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/teachers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Teachers],
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/",
      providesTags: (result) => providesTags(result, Teachers),
    }),
    getTeacher: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: Teachers, id }],
    }),
    addTeacher: builder.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: Teachers, id: LIST }],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Teachers, id }],
    }),
    deleteTeacher: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: Teachers, id }],
    }),
    getTeacherBusyDates: builder.query({
      query: (id) => `/${id}/busy-dates`,
      transformResponse: (response) => response.map((s) => new Date(s)),
    }),
    createTeacherRegistrationToken: builder.mutation({
      query: (id) => ({
        url: `/${id}/registration`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useAddTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useGetTeacherBusyDatesQuery,
  useCreateTeacherRegistrationTokenMutation,
} = teacherApi;
