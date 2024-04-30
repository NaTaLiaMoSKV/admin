import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags, LIST } from "utils/createApiUtils";

const Students = "Students";

export const studentApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/students`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Students],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/",
      providesTags: (result) => providesTags(result, Students),
    }),
    getStudent: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: Students, id }],
    }),
    addStudent: builder.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: Students, id: LIST }],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Students, id }],
    }),
    deleteStudent: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: Students, id }],
    }),
    createStudentRegistrationToken: builder.mutation({
      query: (id) => ({
        url: `/${id}/registration`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useCreateStudentRegistrationTokenMutation,
} = studentApi;
