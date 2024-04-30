export const LIST = "LIST";
export const providesTags = (result, tagType) =>
  result
    ? [
        ...result.map(({ id }) => ({ type: tagType, id })),

        { type: tagType, id: LIST },
      ]
    : [{ type: tagType, id: LIST }];
