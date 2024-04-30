import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesTags, LIST } from "utils/createApiUtils";
import { strToDate } from "utils/dateUtils";

const Groups = "Groups";
const Lessons = "Lessons";

const transformGroup = (group) => ({
  ...group,
  startsAfter: new Date(group.startsAfter),
});

export const transformLesson = (lesson) => ({
  ...lesson,
  startsAt: strToDate(lesson.startsAt),
  startedAt: strToDate(lesson.startedAt),
  finishedAt: strToDate(lesson.finishedAt),
});

export const groupApi = createApi({
  reducerPath: "groups",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/groups`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [Groups, Lessons],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "/",
      providesTags: (result) => providesTags(result, Groups),
      transformResponse: (response) => response.map(transformGroup),
    }),
    getGroup: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: Groups, id }],
      transformResponse: (response) => transformGroup(response),
    }),
    addGroup: builder.mutation({
      query(body) {
        return {
          url: `/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: Groups, id: LIST }],
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: Groups, id }],
    }),
    deleteGroup: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: Groups, id }],
    }),
    getGroupLessons: builder.query({
      query: (id) => `/${id}/lessons`,
      providesTags: [{ type: Lessons }],
      transformResponse: (response) => response.map(transformLesson),
    }),
    createGroupLessons: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}/lessons`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: Groups, id },
        { type: Lessons },
      ],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupLessonsQuery,
  useCreateGroupLessonsMutation,
} = groupApi;
