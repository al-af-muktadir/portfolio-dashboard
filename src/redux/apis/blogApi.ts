import { baseApi } from "./baseApi/BaseApi";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    getSingleBlogs: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
    createBlogs: builder.mutation({
      query: (blogs) => ({
        url: `/blogs`,
        method: "POST",
        body: blogs,
      }),
      invalidatesTags: ["blogs"],
    }),
    updateBlogs: builder.mutation({
      query: ({ id, blogs }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: blogs,
      }),
      invalidatesTags: ["blogs"],
    }),
    DeleteBlogs: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});
export const {
  useGetBlogsQuery,
  useGetSingleBlogsQuery,
  useCreateBlogsMutation,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation,
} = BlogApi;
