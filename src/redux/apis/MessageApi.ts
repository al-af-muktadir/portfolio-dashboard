import { baseApi } from "./baseApi/BaseApi";

export const MEssageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),
    getMessage: builder.query({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});
export const { usePostMessageMutation, useGetMessageQuery } = MEssageApi;
